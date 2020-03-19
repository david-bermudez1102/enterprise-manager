class Record < ApplicationRecord
  belongs_to :form, counter_cache: true
  has_many :values, dependent: :delete_all
  has_one :zoho_integration_record, class_name:"IntegrationRecord", foreign_key: "zoho_integration_record_id"
  has_one :quickbooks_integration_record, class_name:"IntegrationRecord", foreign_key: "quickbooks_integration_record_id"

  accepts_nested_attributes_for :zoho_integration_record, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :quickbooks_integration_record, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :values
end
