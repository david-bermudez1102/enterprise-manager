class Form < ApplicationRecord
  belongs_to :organization
  has_many :fields
end
