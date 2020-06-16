class Root < ApplicationRecord
  has_many :organization_roots, dependent: :delete_all
  has_many :organizations, through: :organization_roots
  has_one :account, as: :accountable, dependent: :destroy
  has_many :accounts, dependent: :nullify
end
