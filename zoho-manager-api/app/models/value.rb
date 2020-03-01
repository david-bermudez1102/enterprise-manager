class Value < ApplicationRecord
  belongs_to :field, optional: true
  belongs_to :record_field, optional: true
  belongs_to :record
end
