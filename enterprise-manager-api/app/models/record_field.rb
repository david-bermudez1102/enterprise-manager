class RecordField < ApplicationRecord
  include ::FieldConcern
  belongs_to :form, touch: true
  belongs_to :field, touch: true, optional: true, dependent: :destroy
  has_many :values, dependent: :destroy
  enum field_type: %w[text password selectable checkbox radio textarea date_field numeric_field combined_field key_field accounts_field boolean_field]
  enum field_format: %w[all_underscored all_dashed dashed_upper underscored_upper dashed_lower underscored_lower all_spaced_upper all_spaced_lower no_format] # Only required when field is combined

  has_one :selectable_resource, dependent: :destroy
  has_many :options, dependent: :destroy
  serialize :combined_fields, Array
  before_create :generate_field_alias

  validates :field_id, presence: true, uniqueness: true, on: [:create, :update]
  validates :name, presence: true
  validates :name, uniqueness: { scope: :form }

  accepts_nested_attributes_for :selectable_resource, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  accepts_nested_attributes_for :options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == '_destroy' || value.blank? } }

  def name
    self[:name].capitalize
  end

  def field_alias
    self.update_attribute(:field_alias, generate_field_alias) if self[:field_alias].nil? || self.name_changed?
    self[:field_alias]
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
    field = RecordField.find_by(field_alias: field_alias)
    unless field
      field_alias
    else
      count = 0
      while true
        new_field_alias = "#{field_alias}_#{count}"
        return new_field_alias unless RecordField.find_by(field_alias: new_field_alias)
        count += 1
      end
    end
  end

  def cache_key
    "/record_fields/#{id}-#{updated_at}"
  end
end
