class RecordKey < ApplicationRecord
  belongs_to :field
  belongs_to :resource_field, class_name: 'Field'
  has_many :key_values
end
