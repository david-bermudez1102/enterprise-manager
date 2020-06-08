class FormSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  #cache_options enabled: true, cache_length: 12.hours
  attributes :id, :name, :form_alias, :organization_id, :records_count, :deleted_records_count, :current_month_records_count, :current_month_deleted_records_count

  attribute :zoho_connection_attributes do |obj|
    if obj.zoho_connection
      ConnectionSerializer.new(obj.zoho_connection).serializable_hash[:data][:attributes]
    end
  end

  attribute :quickbooks_connection_attributes do |obj|
    if obj.quickbooks_connection
      ConnectionSerializer.new(obj.quickbooks_connection).serializable_hash[:data][:attributes]
    end
  end

  attribute :record_fields_attributes do |obj|
    if obj.record_fields
      RecordFieldSerializer.new(obj.record_fields).serializable_hash[:data].map { |r_f| r_f[:attributes]}
    end
  end
  
  
  attribute :last_record_date do |obj|
    if obj.last_record_date
      obj.last_record_date.created_at
    end
  end

end
