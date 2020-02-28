class Value < ApplicationRecord
  belongs_to :record_field
  belongs_to :record, through: :record_field
end
