class IntegrationRecord < ApplicationRecord
  belongs_to :connection
  belongs_to :record
end
