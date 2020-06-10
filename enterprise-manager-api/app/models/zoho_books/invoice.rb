class ZohoBooks::Invoice < ApplicationRecord
  include ZohoBooks::CreateConcern
  include ZohoBooks::UpdateConcern
  include ZohoBooks::SyncConcern
end
