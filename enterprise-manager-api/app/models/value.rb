class Value < ApplicationRecord
  include ::ValueConcern
  belongs_to :field, touch: true, optional: true
  belongs_to :record_field, touch: true, optional: true
  belongs_to :record, touch: true
  has_one :form, through: :record
  belongs_to :account, optional: true #If field is accounts_type
  belongs_to :option, optional: true, touch: true
  belongs_to :record_value, touch: true, class_name:"Value", optional: true
  belongs_to :key_value, optional: true, touch: true
  has_many :checkbox_options, dependent: :delete_all

  validates :record_field, uniqueness: { scope: :record }, on: :create
  before_create :generate_key_value
  
  after_save :touch_selectable_resource

  accepts_nested_attributes_for :checkbox_options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  scope :this_month, -> { where(created_at: Time.now.beginning_of_month..Time.now.end_of_month) }

  validates :content, presence: true, if: -> { record_field.field.is_required  }
  validate :should_content_be_uniq
  validates :content, numericality: true, if: -> {record_field.field.field_type == "numeric_field" && record_field.field.accepts_decimals}
  validates :content, numericality: {only_integer: true}, if: -> {record_field.field.field_type == "numeric_field" && !record_field.field.accepts_decimals}

  validates :record_value, presence:true, if: -> {record_field.field.field_type == "selectable"}

  def cache_key
    "/values/#{id}-#{updated_at}"
  end

  private
    def touch_selectable_resource
      selectable_resource = SelectableResource.where(resource_field_id: record_field.field.id).where.not( record_field:nil)
      selectable_resource.each { |sel| sel.record_field.touch} if selectable_resource
    end

    def should_content_be_uniq
      if record_field.field.is_uniq && record.form.records.joins(:values).find_by(values:{content: content})
        errors.add(:content, "Field #{record_field.field.name} with content #{content} already exists!")
      end
    end

end
