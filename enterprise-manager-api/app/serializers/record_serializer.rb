class RecordSerializer
  include FastJsonapi::ObjectSerializer
  #cache_options enabled: true, cache_length: 12.hours
  
  set_key_transform :camel_lower
  attributes :id, :form_id

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


  link :values do |object|
    new_hash = {}
    object.values.each do |value|
      
      new_hash[:id] = object.id
      new_hash[:formId] = object.form_id
      new_hash[value.record_field_id] = value.content
      new_hash[value.record_field_id] = value.content_after_dependents if value.content_after_dependents
      new_hash[value.record_field_name] = value.zoho_api_content
      
    end
    new_hash[:createdBy] = object.account.name if object.account 
      new_hash[:createdAt] = object.created_at
      new_hash[:updatedAt] = object.updated_at
      new_hash[:zohoRecordId] = object.zoho_integration_record.external_id if object.zoho_integration_record
      new_hash[:quickbooksRecordId] = object.quickbooks_integration_record.external_id if object.quickbooks_integration_record
    new_hash
  end

end
