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
    self.normalize_values(object)
  end

  link :versions do |obj, params|
    if params[:with_versions]
      versions = obj.values.map(&:versions).flatten
      versions << obj.zoho_integration_record.versions if obj.zoho_integration_record
      versions << obj.quickbooks_integration_record.versions if obj.quickbooks_integration_record
      versions.sort { |a,b| b <=> a }

    end
  end

  def self.normalize_values(record)
    new_hash = {}
    record.values.each do |value|
      
      new_hash[:id] = record.id
      new_hash[:formId] = record.form_id
      new_hash[value.record_field_id] = value.content
      new_hash[value.record_field_id] = value.content_after_dependents if value.content_after_dependents
      new_hash[value.record_field_name] = value.zoho_api_content
      
    end
    new_hash[:createdBy] = record.account.name if record.account 
      new_hash[:createdAt] = record.created_at
      new_hash[:updatedAt] = record.updated_at
      new_hash[:zohoRecordId] = record.zoho_integration_record.external_id if record.zoho_integration_record
      new_hash[:quickbooksRecordId] = record.quickbooks_integration_record.external_id if record.quickbooks_integration_record
    new_hash
  end

end
