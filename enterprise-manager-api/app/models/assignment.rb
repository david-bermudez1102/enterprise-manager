class Assignment < ApplicationRecord
  belongs_to :role, touch:true
  belongs_to :permission, touch:true

  validates_uniqueness_of :role, scope: :permission
end
