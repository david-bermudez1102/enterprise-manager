class Integration < ApplicationRecord
  belongs_to :organization
  belongs_to :account
  belongs_to :zoho_integration, class_name:"Integration", optional: true
  belongs_to :quickbooks_integration, class_name:"Integration", optional: true
end
