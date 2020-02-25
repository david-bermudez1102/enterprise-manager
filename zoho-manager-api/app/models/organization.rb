class Organization < ApplicationRecord
  has_one_attached:logo
  has_many :forms
end
