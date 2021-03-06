class FieldSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  ##cache_options enabled: true, cache_length: 12.hours
  attributes :id, :name, :field_type, :form_id, :field_alias, :is_required, :is_uniq, :default_value, :zoho_field_name, :hidden_in_form, :hidden_in_records, :allow_updates, :read_only, :min_length, :max_length

  attribute :field_dependents, if: Proc.new { |field|field.field_dependents.size > 0 } do |object|
    FieldDependentSerializer.new(object.field_dependents).serializable_hash[:data].map do |d|
      d[:attributes]
    end
  end

  attribute :accepts_decimals, if: Proc.new { |field| field.field_type == "numeric_field" }
  attribute :combined_fields, if: Proc.new { |field| field.field_type == "combined_field" }
  attribute :field_format, if: Proc.new { |field| field.field_type == "combined_field" }
  attribute :record_field_id

  attribute :record_key_attributes do |object|
    if object.record_key
      { id:object.record_key.id, fieldId: object.record_key.field_id, resourceFieldId:object.record_key.resource_field_id }
    end
  end

  attribute :key_values do  |field|
    if field.record_key 
      key_values = KeyValueSerializer.new(field.record_key.key_values).serializable_hash[:data]
      key_values.map do |key_value|
        key_value[:attributes]
      end
    end
  end
  
  attribute :selectable_resource_attributes, if: Proc.new { |field|
                          field.field_type == "selectable"
                        } do |object|
    object.selectable_resource ? { optionsAttributes: object.selectable_resource.resource_field.values.map do |value|
      { id: value.id, value: value.content, recordId:value.record.id } if value.content != ""
    end.compact, resourceFieldId: object.selectable_resource.resource_field_id, formId: object.selectable_resource.form_id } : nil
  end

  attribute :options_attributes, if: Proc.new { |field|
                        field.field_type == "selectable" || field.field_type == "radio" || field.field_type == "checkbox"
                      } do |object|
                        object.options
                      end
  ## Attributes below will be rendered if field type is date

  attribute :date_field_option_attributes, if: Proc.new { |field| field.field_type == "date_field" } do |object|
    if object.date_field_option
      DateFieldOptionSerializer.new(object.date_field_option).serializable_hash[:data][:attributes]
    end
  end

  attribute :able_to_hide_in_form, if: Proc.new { |field| field.field_type == "date_field" } do |obj|
     if obj.date_field_option
      obj.date_field_option.fill_with != "user_input"
     end
  end

  attribute :able_to_be_read_only, if: Proc.new { |field| field.field_type == "date_field" } do |obj|
     if obj.date_field_option
      obj.date_field_option.fill_with != "user_input"
     end
  end

  ##############

end
