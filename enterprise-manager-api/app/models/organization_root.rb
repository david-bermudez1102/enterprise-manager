class OrganizationRoot < ApplicationRecord
  belongs_to :organization
  belongs_to :root
end
