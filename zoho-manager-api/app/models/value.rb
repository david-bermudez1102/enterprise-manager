class Value < ApplicationRecord
  belongs_to :field, optional: true
  belongs_to :record_field, optional: true
  belongs_to :record
  belongs_to :option, optional: true
  belongs_to :record_value, class_name:"Value", optional: true
end
