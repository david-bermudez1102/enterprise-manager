class Account < ApplicationRecord
  belongs_to :accountable, polymorphic: true
  validates :name, presence: :true, format: { with: /\A[a-zA-Z]+\Z/ }
  validates :email, format: {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}, uniqueness: {message:"already belongs to an existing account"}
  validates :password, presence: true, length: { in: 6..50 }, format: { without: /\s/ }, :on => :create
  has_secure_password
end
