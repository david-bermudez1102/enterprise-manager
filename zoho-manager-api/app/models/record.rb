class Record < ApplicationRecord
  belongs_to :form
  has_many :values
  accepts_nested_attributes_for :values
end
