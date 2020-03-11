class Organization < ApplicationRecord
  has_one_attached :logo
  has_many :forms, dependent: :delete_all
  has_many :admins, dependent: :delete_all
  has_one :zoho_integration, class_name: "Integration"
  has_one :quickbooks_integration, class_name: "Integration"
  accepts_nested_attributes_for :zoho_integration, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
  accepts_nested_attributes_for :quickbooks_integration, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
end
