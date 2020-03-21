class Admin < ApplicationRecord
  has_one :account, as: :accountable, dependent: :destroy
  has_many :employees, dependent: :nullify
  has_many :managers, dependent: :nullify
end
