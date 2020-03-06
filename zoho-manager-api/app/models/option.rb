class Option < ApplicationRecord
  has_one :record_field
  has_one :field
  has_one :key_value
end
