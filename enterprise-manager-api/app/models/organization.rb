class Organization < ApplicationRecord
  has_one_attached :logo
  validates :name, presence: :true, format: { with: /\A[a-zA-Z]+\Z/ }
  has_many :forms, dependent: :delete_all
  has_many :admins, dependent: :delete_all
  has_one :zoho_integration, class_name: "Integration", foreign_key: "zoho_integration_id", primary_key: "id"
  has_one :quickbooks_integration, class_name: "Integration", foreign_key: "quickbooks_integration_id", primary_key: "id"
  accepts_nested_attributes_for :zoho_integration, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
  accepts_nested_attributes_for :quickbooks_integration, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
end
