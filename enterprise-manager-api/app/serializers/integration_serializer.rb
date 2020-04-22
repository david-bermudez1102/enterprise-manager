class IntegrationSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id, :auth_token, :client_id, :refresh_token, :client_secret, :redirect_uri,  :organization_id, :external_organization_id
end
