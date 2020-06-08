class ConnectionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id, :name, :connection_type, :integration_id
end
