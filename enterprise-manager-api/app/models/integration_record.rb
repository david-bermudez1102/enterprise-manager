class IntegrationRecord < ApplicationRecord
  belongs_to :connection, touch: true
  belongs_to :record, touch: true

  has_paper_trail
end
