class KeyValue < ApplicationRecord
  belongs_to :record_key
  belongs_to :record_value, class_name: "Value", optional:true
  belongs_to :option, optional: true
  validates :value, uniqueness: true
end
