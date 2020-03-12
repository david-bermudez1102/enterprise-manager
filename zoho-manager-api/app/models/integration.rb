class Integration < ApplicationRecord
  belongs_to :organization
  belongs_to :account
  validates :auth_token, presence: true
end
