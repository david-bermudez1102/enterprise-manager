class RecordFieldSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  cache_options enabled: true, cache_length: 12.hours

  attributes :id, :field_id, :name, :field_type, :form_id, :field_alias, :is_required, :default_value
  
  attribute :accepts_decimals, if: Proc.new { |field| field.field_type == "numeric_field" }
  attribute :combined_fields, if: Proc.new { |field| field.field_type == "combined_field" }
  attribute :field_format, if: Proc.new { |field| field.field_type == "combined_field" }

  attribute :record_key_attributes do |record_field|
    record_field.field && record_field.field.record_key ? { id:record_field.field.record_key.id, fieldId: record_field.field.record_key.field_id, resourceFieldId:record_field.field.record_key.resource_field_id } : nil
  end

  attribute :selectable_resource_attributes, if: proc { |field|
                          field.field_type == "selectable"
                        } do |object|
    if object.selectable_resource
    { optionsAttributes: object.selectable_resource.form.fields.find_by(id: object.selectable_resource.resource_field_id).values.map do |value|
      { id: value.id, value: value.content }
    end || [] } 
  end
  end
  attribute :options_attributes, if: proc { |field|
              field.field_type == "selectable" || field.field_type == "radio" || field.field_type == "checkbox"
            } do |object|
              object.options
            end
end
