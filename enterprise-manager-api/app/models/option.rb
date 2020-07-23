class Option < ApplicationRecord
  belongs_to :field
  has_one :record_field, through: :field
  validates :value, uniqueness: { scope: :field }
  has_one :key_value
end
