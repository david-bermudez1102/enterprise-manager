class RecordField < ApplicationRecord
  belongs_to :record
  has_many :values
end
