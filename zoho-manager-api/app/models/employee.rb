class Employee < ApplicationRecord
  has_one :account, as: :accountable
end
