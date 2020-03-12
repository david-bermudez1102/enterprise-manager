class OrganizationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
  attribute :zoho_integration do |obj|
    IntegrationSerializer.new(obj.zoho_integration)
  end

  attribute :quickbooks_integration do |obj|
    IntegrationSerializer.new(obj.quickbooks_integration)
  end
  attribute :message do 
    "success"
  end

  attribute :logo do |object|
    Rails.application.routes.url_helpers.rails_blob_path(
      object.logo,
      only_path: true,
    )
  end
end
