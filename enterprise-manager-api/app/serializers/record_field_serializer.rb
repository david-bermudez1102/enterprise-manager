class RecordFieldSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  cache_options enabled: true, cache_length: 12.hours

  attributes :id, :field_id, :name, :field_type, :form_id, :field_alias, :is_required, :default_value
  
  attribute :accepts_decimals, if: Proc.new { |field| field.field_type == "numeric_field" }
  attribute :combined_fields, if: Proc.new { |field| field.field_type == "combined_field" }
  attribute :field_format, if: Proc.new { |field| field.field_type == "combined_field" }

  attribute :record_key do |record_field|
    record_field.field ? record_field.field.record_key : nil
  end
  
  attribute :selectable_resource, if: proc { |field|
                          field.field_type == "selectable"
                        } do |object|
    if object.selectable_resource
    { options: object.selectable_resource.form.fields.find_by(id: object.selectable_resource.resource_field_id).values.map do |value|
      { id: value.id, value: value.content }
    end || [] } 
  end
  end
  attribute :options, if: proc { |field|
              field.field_type == "selectable" || field.field_type == "radio" || field.field_type == "checkbox"
            }
end
