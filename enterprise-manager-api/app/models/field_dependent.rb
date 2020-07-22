class FieldDependent < ApplicationRecord
  belongs_to :field, optional: :true, touch: true
  belongs_to :dependent_field, class_name: "Field", foreign_key: :dependent_field_id, optional: true
  belongs_to :resource_field, class_name: "Field", foreign_key: :resource_field_id, optional: true
  
  has_many :sub_dependents, class_name: "FieldDependent", foreign_key: :sub_dependent_id
  belongs_to :sub_dependent_option, class_name: "Option", foreign_key: :sub_dependent_option_id, optional: true

  enum operation: %w[add subtract concatenate multiply divide replace dependent_times copy percentage]

  validate :field_dependent_is_not_same_field
  validates :operation, presence: true, if: :does_not_have_sub_dependents
  validates :dependent_field, uniqueness: { scope: :field }, if: :dependent_field_is_not_sub_dependent
  validates :resource_field, presence: true, if: :dependent_field_is_selectable?
  accepts_nested_attributes_for :sub_dependents, allow_destroy: true
  validate :operation_is_percentage

  private
    def dependent_field_is_selectable?
      dependent_field && dependent_field.field_type == "selectable"
    end

    def field_is_numeric?
      dependent_field && field.field_type == "numeric_field"
    end

    def does_not_have_sub_dependents
      all_values_same_operation && !sub_dependent_option_id
    end
    
    def dependent_field_is_not_sub_dependent
      !sub_dependent_id
    end

    def field_dependent_is_not_same_field
      if dependent_field && dependent_field == field
        errors.add(:field, "can't be dependent of itself")
      end
    end

    def operation_is_percentage
      if is_percentage && all_values_same_operation && !content.to_i.between?(1, 100)
        errors.add(:operation, "percentage has to be between 1 - 100")
      end
    end
end
