class Field < ApplicationRecord
  belongs_to :form, touch: true
  enum field_type: %w[text password selectable checkbox radio textarea date_field numeric_field combined_field key_field accounts_field boolean_field]
  enum field_format: %w[all_underscored all_dashed dashed_upper underscored_upper dashed_lower underscored_lower all_spaced_upper all_spaced_lower no_format] # Only required when field is combined

  has_one :selectable_resource, dependent: :destroy
  has_one :record_key, dependent: :destroy
  has_one :record_field, dependent: :nullify
  has_many :options, dependent: :nullify
  has_many :values, through: :record_field
  has_many :key_values, through: :record_key
  has_many :field_dependents, dependent: :destroy
  has_many :dependent_for, class_name:"FieldDependent", foreign_key: :dependent_field_id
  has_one :date_field_option, dependent: :destroy
  
  serialize :combined_fields, Array
  
  before_create :generate_field_alias
  before_create :generate_position

  after_save :nullify_form_alias, if: :saved_change_to_name?
  
  validates :name, presence: true
  validates :name, uniqueness: { scope: :form }
  validates :field_type, presence: true
  validates :combined_fields, length: { minimum: 2, message:"requires at least 2 fields" }, if: -> {field_type == "combined_field"}
  
  accepts_nested_attributes_for :selectable_resource, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  accepts_nested_attributes_for :options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  accepts_nested_attributes_for :record_key, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  accepts_nested_attributes_for :field_dependents, allow_destroy: true
  accepts_nested_attributes_for :date_field_option, update_only: true

  def name
    self[:name].capitalize
  end

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

    def generate_position
      self[:position] = form.fields.size
    end
  
end
