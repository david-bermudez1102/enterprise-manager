class RecordKey < ApplicationRecord
  belongs_to :field, touch: true
  belongs_to :resource_field, class_name: 'Field', touch: true
  has_many :key_values, dependent: :delete_all

  validate :resource_field_belongs_to_form

  def resource_field_belongs_to_form
    if field.form_id != resource_field.form_id
      errors.add(:resource_field, "The field selected doesn't belong to the current resource.")
    end
  end
end
