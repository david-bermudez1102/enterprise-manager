class DefaultPermission < ApplicationRecord
  belongs_to :role
  has_one :permission, as: :permissionable, dependent: :destroy
  has_many :assignments, through: :permission, dependent: :destroy
  has_many :exclusions, through: :permission
  
  accepts_nested_attributes_for :permission, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
end
