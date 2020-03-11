class Record < ApplicationRecord
  belongs_to :form
  has_many :values, dependent: :delete_all
  accepts_nested_attributes_for :values
end
