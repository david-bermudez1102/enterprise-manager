class ValueSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  #cache_options enabled: true, cache_length: 12.hours

  attributes :id, :record_field_id, :record_id, :form_id

  attribute :content do |value|
    if value.record_field.field_type == "numeric_field"
      value.content.to_f
    else
      value.content
    end
  end

  attribute :api_content do |value|
    record_value = value.record_value
    record = record_value.record if record_value
    zoho_integration_record = record.zoho_integration_record if record

    if zoho_integration_record
      zoho_integration_record.external_id
    else
      value.record_field.field_type == "numeric_field" ? value.content.to_f : value.content
    end
  end

  attribute :record_field_name do |value|
    record_field = value.record_field
    field = record_field.field if record_field
    zoho_connection = field.selectable_resource.form.zoho_connection if field.selectable_resource

    if field && field.selectable_resource && zoho_connection
      if zoho_connection.connection_type == "contacts"
        "customer_id"
      else
        "#{zoho_connection.connection_type.downcase.singularize}_id"
      end
      
    else
      if !record_field.zoho_field_name.nil? 
        record_field.zoho_field_name
      else 
        record_field.name.downcase.split(" ").join("_")
      end
    end
  end

  attribute :key_value do |value|
    if value.record_value
      record_key = KeyValueSerializer.new(value.record_value.key_value).serializable_hash[:data]
      record_key ? record_key[:attributes] : nil
    end
  end
  
end
