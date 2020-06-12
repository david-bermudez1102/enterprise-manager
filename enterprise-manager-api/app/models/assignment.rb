class Assignment < ApplicationRecord
  belongs_to :role
  belongs_to :permission

  validates_uniqueness_of :role, scope: :permission
end
