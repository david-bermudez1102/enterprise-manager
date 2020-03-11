class OrganizationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :zoho_integration, :quickbooks_integration
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
