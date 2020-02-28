class Form < ApplicationRecord
  belongs_to :organization
  has_many :fields
  has_many :records
  has_many :record_fields
  has_many :values, through: :records
end
