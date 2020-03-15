class Manager < ApplicationRecord
  has_one :account, as: :accountable
  belongs_to :admin
end
