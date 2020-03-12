class IntegrationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :auth_token, :organization_id, :external_organization_id
end
