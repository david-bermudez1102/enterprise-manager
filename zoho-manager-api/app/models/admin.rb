class Admin < ApplicationRecord
  has_one :account, as: :accountable, dependent: :destroy
end
