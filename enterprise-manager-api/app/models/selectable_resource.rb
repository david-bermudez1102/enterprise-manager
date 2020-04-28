class SelectableResource < ApplicationRecord
  belongs_to :form, touch:true
  belongs_to :field, optional: true, touch:true
  belongs_to :record_field, optional: true, touch:true
  belongs_to :resource_field, class_name: 'Field', foreign_key: 'resource_field_id', touch:true
end
