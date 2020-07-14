class FieldDependent < ApplicationRecord
  belongs_to :field
  belongs_to :dependent_field, class_name: "Field", foreign_key: :dependent_field_id
  enum operation: %w[add subtract concatenate multiply divide replace dependent_times]

  validates :operation, presence: true
  validates :dependent_field, uniqueness: { scope: :field }
end
