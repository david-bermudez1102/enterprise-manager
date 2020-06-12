class Role < ApplicationRecord
  has_many :assignments, dependent: :delete_all
  has_many :permissions, through: :assignments
  validates :name, presence: true, uniqueness: true 

  def name
    self[:name].capitalize
  end
end
