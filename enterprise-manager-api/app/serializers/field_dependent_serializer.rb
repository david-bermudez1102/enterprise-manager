class FieldDependentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  ##cache_options enabled: true, cache_length: 12.hours

  attributes :id, :content, :operation, :is_percentage, :is_percentage_from_dependent

  attribute :dependent_field_id, if: Proc.new { |obj| obj.dependent_field_id }

  attribute :dependent_id, if: Proc.new { |obj| obj.sub_dependent_id } do |obj|
    obj.sub_dependent_id
  end

  attribute :sub_dependent_option_id, if: Proc.new { |obj| obj.sub_dependent_option_id }

  attribute :label, if: Proc.new { |obj| obj.dependent_field_id } do |obj|
    obj.dependent_field.name if obj.dependent_field
  end

  attribute :resource_field_id, if: Proc.new { |obj| obj.resource_field }
  attribute :resource_field_form_id, if: Proc.new { |obj| obj.resource_field }  do |obj|
    obj.resource_field.form_id
  end

  attribute :resource_field_name, if: Proc.new { |obj| obj.resource_field }  do |obj|
    obj.resource_field.name.downcase
  end

  attribute :all_values_same_operation, if: Proc.new { |obj| obj.dependent_field_id } 
  attribute :sub_dependents_attributes, if: Proc.new { |obj| obj.dependent_field_id && !obj.all_values_same_operation } do |obj|
    FieldDependentSerializer.new(obj.sub_dependents).serializable_hash[:data].map { |obj| obj[:attributes]}
  end
end
