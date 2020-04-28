class RecordKey < ApplicationRecord
  belongs_to :field, touch: true, touch: true
  belongs_to :resource_field, class_name: 'Field', touch: true
  has_many :key_values, dependent: :delete_all
end
