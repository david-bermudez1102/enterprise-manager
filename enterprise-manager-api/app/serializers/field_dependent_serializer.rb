class FieldDependentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  ##cache_options enabled: true, cache_length: 12.hours

  attributes :dependent_field_id, :content, :operation 

  attribute :label do |obj|
    obj.dependent_field.name
  end
end
