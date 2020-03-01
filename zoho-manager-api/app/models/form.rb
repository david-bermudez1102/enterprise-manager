class Form < ApplicationRecord
  belongs_to :organization
  has_many :fields, dependent: :delete_all
  has_many :records, dependent: :delete_all
  has_many :record_fields, dependent: :delete_all
  has_many :values, through: :records
end
