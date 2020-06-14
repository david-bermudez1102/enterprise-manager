class DefaultPermissionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attribute :permission_attributes do |obj|
    PermissionSerializer.new(obj.permission).serializable_hash[:data][:attributes]
  end
end
