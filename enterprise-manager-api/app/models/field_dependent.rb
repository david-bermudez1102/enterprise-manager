class FieldDependent < ApplicationRecord
  belongs_to :field
  belongs_to :dependent_field, class_name: "Field", foreign_key: :dependent_field_id
  belongs_to :resource_field, class_name: "Field", foreign_key: :resource_field_id, optional: true
  
  has_many :sub_dependents, class_name: "FieldDependent", foreign_key: :sub_dependent_id
  belongs_to :sub_dependent_option, class_name: "Option", foreign_key: :sub_dependent_option_id, optional: true

  enum operation: %w[add subtract concatenate multiply divide replace dependent_times copy]

  validates :operation, presence: true
  validates :dependent_field, uniqueness: { scope: :field }
  validates :resource_field, presence: true, if: :dependent_field_is_selectable?

  private
    def dependent_field_is_selectable?
      dependent_field.field_type == "selectable"
    end

    def field_is_numeric?
      field.field_type == "numeric_field"
    end
end
