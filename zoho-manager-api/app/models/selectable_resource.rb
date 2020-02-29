class SelectableResource < ApplicationRecord
  belongs_to :form
  belongs_to :field
  belongs_to :record_field
  belongs_to :resource_field, class_name: "Field", foreign_key: "resource_field_id"
end
