class FieldDependentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  ##cache_options enabled: true, cache_length: 12.hours

  attributes :id, :dependent_field_id, :content, :operation 

  attribute :label do |obj|
    obj.dependent_field.name
  end

  attribute :resource_field_id
  attribute :resource_field_form_id, if: Proc.new { |obj| obj.resource_field }  do |obj|
    obj.resource_field.form_id
  end

  attribute :resource_field_name, if: Proc.new { |obj| obj.resource_field }  do |obj|
    obj.resource_field.name.downcase
  end
end
