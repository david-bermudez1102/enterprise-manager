class RecordKey < ApplicationRecord
  belongs_to :field
  has_many :key_values
end
