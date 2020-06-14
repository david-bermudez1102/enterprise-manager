class RoleSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attributes :id, :name

  attribute :default_permission_attributes do |obj|
    if obj.default_permission
      DefaultPermissionSerializer.new(obj.default_permission).serializable_hash[:data][:attributes]
    end
  end
end
