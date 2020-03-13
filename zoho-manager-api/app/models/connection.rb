class Connection < ApplicationRecord
  belongs_to :integration
  belongs_to :form
  attribute :connected_through
  enum connection_type: %w[contacts items invoices]

  def connected_through
    if integration.zoho_integration
      "Zoho"
    else
      "QuickBooks"
    end
  end
end
