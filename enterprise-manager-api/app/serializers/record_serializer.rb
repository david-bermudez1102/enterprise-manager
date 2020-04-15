class RecordSerializer
  include FastJsonapi::ObjectSerializer
  cache_options enabled: true
  attributes :id, :form_id
  attribute :zoho_record_id do |obj|
    if obj.zoho_integration_record
      obj.zoho_integration_record.external_id
    end
  end

  attribute :quickbooks_record_id do |obj|
    if obj.quickbooks_integration_record
      obj.quickbooks_integration_record.external_id
    end
  end
  
  link :values do |object|
    ValueSerializer.new(object.values).serializable_hash[:data].map do |value|
      value[:attributes]
    end
  end
end
