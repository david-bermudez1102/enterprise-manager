class Field < ApplicationRecord
  belongs_to :form, touch: true
  enum field_type: %w[text password selectable checkbox radio textarea date_field numeric_field combined_field key_field]
  enum field_format: %w[all_underscored all_dashed dashed_upper underscored_upper dashed_lower underscored_lower all_spaced_upper all_spaced_lower no_format] # Only required when field is combined
  
  has_one :selectable_resource, dependent: :destroy
  has_one :record_key, dependent: :destroy
  has_one :record_field, dependent: :nullify
  has_many :options, dependent: :nullify
  has_many :values, through: :record_field
  has_many :key_values, through: :record_key
  serialize :combined_fields, Array
  
  before_create :generate_field_alias
  before_save :generate_record_field
  after_save :nullify_form_alias, if: :saved_change_to_name?
  
  validates :name, presence: true
  validates :field_type, presence: true
  accepts_nested_attributes_for :selectable_resource, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  accepts_nested_attributes_for :options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  accepts_nested_attributes_for :record_key, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  def field_alias
    self.update_attribute(:field_alias, generate_field_alias) if self[:field_alias].nil?
    self[:field_alias]
  end

  def nullify_form_alias
      self.update_attribute(:field_alias, nil)
  end

  def generate_field_alias
    field_alias = ActiveSupport::Inflector.transliterate(self.name) # change ñ => n
      .downcase # only lower case
      .gsub(/[^a-z]/, "_") # any character that is not a letter or a number will be _
      .gsub(/\A_+/, "") # remove underscores at the beginning
      .gsub(/_+\Z/, "") # remove underscores at the end
      .gsub(/_+/, "_")       # maximum an underscore in a row

    find_unique_field_alias(field_alias)
  end

  def find_unique_field_alias(field_alias)
    field = Field.find_by(field_alias: field_alias)
    unless field
      field_alias
    else
      count = 0
      while true
        new_field_alias = "#{field_alias}_#{count}"
        return new_field_alias unless Field.find_by(field_alias: new_field_alias)
        count += 1
      end
    end
  end

  def cache_key
    "/fields/#{id}-#{updated_at}"
  end

  private
  def generate_record_field
    begin
      RecordField.find_or_create_by(field_id:id, :name => name,
      :field_type => field_type,
      :form_id => form_id,
      :is_required => is_required,
      :default_value => default_value,
      :accepts_decimals => accepts_decimals,
      :field_format => field_format,
      :combined_fields => combined_fields,
      :selectable_resource => selectable_resource,
      :options => options
      )
    rescue => exception
      errors.add(:record_field, "Couldn't be saved")
      
    end
    
  end


  
end
