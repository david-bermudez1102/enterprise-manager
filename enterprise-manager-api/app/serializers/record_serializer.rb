class RecordSerializer
  include FastJsonapi::ObjectSerializer
  cache_options enabled: true, cache_length: 12.hours
  
  set_key_transform :camel_lower
    attributes :id, :form_id
  attribute :zoho_record_id do |obj|
    if obj.zoho_integration_record
      obj.zoho_integration_record.external_id
    end
  end

  attribute :records_count, if: Proc.new { |record, params|
    params && !params[:records_count].nil?
  } do |record|
    record.form.records_count
  end

  attribute :current_month_records_count, if: Proc.new { |record, params|
    params && !params[:current_month_records_count].nil?
  } do |record|
    record.form.current_month_records_count
  end

  attribute :quickbooks_record_id do |obj|
    if obj.quickbooks_integration_record
      obj.quickbooks_integration_record.external_id
    end
  end
  
  link :values do |object|
    ValueSerializer.new(object.values).serializable_hash[:data].map do |value|
      new_hash = {}
      new_hash[:id] = value[:attributes][:recordId]
      new_hash[:formId] = value[:attributes][:formId]
      new_hash[value[:attributes][:recordFieldId]] = value[:attributes][:content]
      new_hash[:createdAt] = object.created_at
      new_hash[:updatedAt] = object.updated_at
      new_hash
    end.reduce({}, :merge)
  end
end
