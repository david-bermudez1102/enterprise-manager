class ZohoBooks::Contact < ApplicationRecord
  include ZohoBooks::CreateConcern
  include ZohoBooks::UpdateConcern
  include ZohoBooks::SyncConcern
end