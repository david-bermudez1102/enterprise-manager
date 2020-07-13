class FieldDependent < ApplicationRecord
  belongs_to :field
  belongs_to :dependent_field, class_name: "Field", foreign_key: :dependent_field_id
  enum operation: %w[add subtract concatenate]

  validates :operation, presence: true
end
