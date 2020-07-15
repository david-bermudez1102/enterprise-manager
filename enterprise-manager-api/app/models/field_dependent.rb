class FieldDependent < ApplicationRecord
  belongs_to :field
  belongs_to :dependent_field, class_name: "Field", foreign_key: :dependent_field_id
  belongs_to :resource_field, class_name: "Field", foreign_key: :resource_field_id, optional: true

  enum operation: %w[add subtract concatenate multiply divide replace dependent_times copy]

  validates :operation, presence: true
  validates :dependent_field, uniqueness: { scope: :field }
  validates :resource_field, presence: true, if: :dependent_field_is_selectable?

  private
    def dependent_field_is_selectable?
      dependent_field.field_type == "selectable"
    end
end
