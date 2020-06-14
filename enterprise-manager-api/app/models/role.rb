class Role < ApplicationRecord
  has_one :default_permission, dependent: :destroy
  has_many :assignments, dependent: :delete_all
  has_many :permissions, through: :assignments, dependent: :delete_all
  has_many :account_roles, dependent: :delete_all
  has_many :accounts, through: :account_roles
  validates :name, presence: true, uniqueness: true

  accepts_nested_attributes_for :default_permission, update_only: true, allow_destroy: true, reject_if: proc { |attributes| 
    attributes.all? do |key, value| 
      key == "_destroy" || value.blank?
    end
  }

  def name
    self[:name].capitalize
  end
end
