class IntegrationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :auth_token, :organization_id
end
