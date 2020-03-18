class OrganizationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
  attribute :zoho_integration do |obj|
    if obj.zoho_integration
      zi = IntegrationSerializer.new(obj.zoho_integration).serializable_hash[:data]
      if zi 
        zi[:attributes] 
      end
    end
  end

  attribute :quickbooks_integration do |obj|
    if obj.quickbooks_integration
      IntegrationSerializer.new(obj.quickbooks_integration)
    else
      nil
    end
  end
  
  attribute :messages do |object, params|
    params[:messages]
  end

  attribute :logo do |object|
    Rails.application.routes.url_helpers.rails_blob_path(
      object.logo,
      only_path: true,
    )
  end
end
