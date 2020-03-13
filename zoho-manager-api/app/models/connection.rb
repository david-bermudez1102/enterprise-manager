class Connection < ApplicationRecord
  belongs_to :integration
  belongs_to :form
  enum type: %w[contacts items invoices]
end
