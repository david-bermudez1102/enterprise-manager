class IntegrationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :auth_token, :client_id, :refresh_token, :client_secret, :redirect_uri,  :organization_id, :external_organization_id
end
