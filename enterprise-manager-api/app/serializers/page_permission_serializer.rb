class PagePermissionSerializer
  include FastJsonapi::ObjectSerializer
  #cache_options enabled: true, cache_length: 12.hours

  set_key_transform :camel_lower

  attributes :id, :page_name

  attribute :permission_attributes do |obj|
    PermissionSerializer.new(obj.permission).serializable_hash[:data][:attributes]
  end
end
