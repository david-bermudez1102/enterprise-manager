class Record < ApplicationRecord
  belongs_to :form
  has_many :values
  has_many :record_fields
  accepts_nested_attributes_for :values
end
