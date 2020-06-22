class PagePermission < ApplicationRecord
  belongs_to :organization
  has_one :permission, as: :permissionable, dependent: :destroy
  has_many :assignments, through: :permission, dependent: :destroy
  has_many :exclusions, through: :permission

  enum page_name: %w[Form Record Account Organization PagePermission Role]
  
  accepts_nested_attributes_for :permission, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  validates :page_name, uniqueness: { scope: :organization }
end
