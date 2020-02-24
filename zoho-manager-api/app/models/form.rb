class Form < ApplicationRecord
  has_many :fields
  belongs_to :organization
end
