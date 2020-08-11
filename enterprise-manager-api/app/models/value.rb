class Value < ApplicationRecord
  include ::ValueConcern
  belongs_to :record_field, touch: true, optional: true
  has_one :field, through: :record_field
  has_many :field_dependents, through: :field
  has_many :dependent_for, through: :field

  belongs_to :record, touch: true, optional: true, inverse_of: :values
  has_one :form, through: :record
  belongs_to :account, optional: true #If field is accounts_type
  belongs_to :option, optional: true, touch: true
  belongs_to :record_value, touch: true, class_name:"Value", optional: true
  belongs_to :key_value, optional: true, touch: true
  has_many :checkbox_options, dependent: :delete_all
  
  validates :record_field, uniqueness: { scope: :record }

  before_create :generate_key_value
  after_save :touch_selectable_resource

  accepts_nested_attributes_for :checkbox_options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  scope :this_month, -> { where(created_at: Time.now.beginning_of_month..Time.now.end_of_month) }

  validates :content, presence: true, if: -> { field.is_required  }
  
  validate :should_content_be_uniq
  validates :content, numericality: true, if: -> { field.field_type == "numeric_field" && field.accepts_decimals && content != "" && content}
  validates :content, numericality: {only_integer: true}, if: -> { field.field_type == "numeric_field" && !field.accepts_decimals && content != "" && content}

  validates :record_value, presence:true, if: -> { field.field_type == "selectable"}

  has_paper_trail ignore: [:content_after_dependents]

  def content
    if self[:content]
      if field.field_type == "numeric_field" && field.accepts_decimals
        self[:content].to_f.to_s
      elsif field.field_type == "numeric_field" && !field.accepts_decimals
        self[:content].to_i
      else
        self[:content]
      end
    end
  end

  def content_after_dependents
    if self[:content_after_dependents]
      if field.field_type == "numeric_field" && field.accepts_decimals
        self[:content_after_dependents].to_f.to_s
      elsif field.field_type == "numeric_field" && !field.accepts_decimals
        self[:content_after_dependents].to_i
      else
        self[:content_after_dependents]
      end
    end
  end
  
  def cache_key
    "/values/#{id}-#{updated_at}"
  end

  def zoho_api_content
    new_record = record_value.record if record_value
    zoho_integration_record = new_record.zoho_integration_record if new_record

    if zoho_integration_record
      zoho_integration_record.external_id
    else
      if field.field_dependents.size > 0 && content_after_dependents && content_after_dependents != ""
        new_content = content_after_dependents
      else
        new_content = content
      end

      if field.field_type == "numeric_field" 
        new_content.to_f
      else
        new_content
      end
    end
  end

  def record_field_name
    zoho_connection = field.selectable_resource.form.zoho_connection if field.selectable_resource

    if field && field.selectable_resource && zoho_connection
      if zoho_connection.connection_type == "contacts"
        "customer_id"
      else
        "#{zoho_connection.connection_type.downcase.singularize}_id"
      end
      
    else
      if !record_field.zoho_field_name.nil? 
        record_field.zoho_field_name
      else 
        record_field.name.downcase.split(" ").join("_")
      end
    end
  end


  private
    def touch_selectable_resource
      selectable_resource = SelectableResource.where(resource_field_id: record_field.field.id).where.not( record_field:nil)
      selectable_resource.each { |sel| sel.record_field.touch} if selectable_resource
    end

    def should_content_be_uniq
      if field.is_uniq && record.form.values.find_by(values:{content: content})
        errors.add(:content, "Field #{field.name} with content #{content} already exists!")
      end
    end

    
end
