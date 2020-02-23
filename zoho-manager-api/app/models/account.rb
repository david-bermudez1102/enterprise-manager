class Account < ApplicationRecord
  belongs_to :accountable, polymorphic: true
  has_secure_password
end
