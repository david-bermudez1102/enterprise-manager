class Organization < ApplicationRecord
  has_one_attached :logo
  has_many :forms, dependent: :delete_all
  has_many :admins, dependent: :delete_all
end
