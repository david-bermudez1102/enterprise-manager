class FieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :field_type, :form_id, :record_key
  attribute :key_values do  |field|
    if field.record_key 
      key_values = KeyValueSerializer.new(field.record_key.key_values).serializable_hash[:data]
      key_values.map do |key_value|
        key_value[:attributes]
      end
    end
  end
  attribute :selectable_resource, if: Proc.new { |field|
                          field.field_type == "selectable"
                        } do |object|
    object.selectable_resource ? { options: object.selectable_resource.resource_field.values.map do |value|
      { id: value.id, value: value.content } if value.content != ""
    end.compact, resource_field_id: object.selectable_resource.resource_field_id, resource_id: object.selectable_resource.form_id } : nil
  end
  attribute :options, if: Proc.new { |field|
                        field.field_type == "selectable"
                      }
end
