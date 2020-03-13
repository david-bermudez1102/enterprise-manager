class Connection < ApplicationRecord
  belongs_to :integration
  belongs_to :form
  enum contact_type: %w[contacts items invoices]
end
