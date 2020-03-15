class Admin < ApplicationRecord
  belongs_to :organization, optional: true
  has_one :account, as: :accountable, dependent: :destroy
  has_many :employees, dependent: :nullify
  has_many :managers, dependent: :nullify
end
