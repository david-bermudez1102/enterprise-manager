class Manager < ApplicationRecord
  has_one :account, as: :accountable, dependent: :destroy
  belongs_to :admin
end
