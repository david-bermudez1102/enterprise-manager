class Organization < ApplicationRecord
  has_one_attached :logo
  validates :name, presence: :true
  has_many :forms, dependent: :delete_all
  has_many :accounts, dependent: :delete_all
  has_many :roles, dependent: :delete_all
  has_many :organization_roots, dependent: :delete_all
  has_many :roots, through: :organization_roots
  has_many :page_permissions, dependent: :delete_all

  has_one :zoho_integration, class_name: "Integration", foreign_key: "zoho_integration_id", primary_key: "id"
  has_one :quickbooks_integration, class_name: "Integration", foreign_key: "quickbooks_integration_id", primary_key: "id"

  accepts_nested_attributes_for :zoho_integration, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
  accepts_nested_attributes_for :quickbooks_integration, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
end
