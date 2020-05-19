class FormSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  cache_options enabled: true, cache_length: 12.hours
  attributes :id, :name, :form_alias, :organization_id, :records_count, :deleted_records_count, :current_month_records_count, :current_month_deleted_records_count, :zoho_connection, :quickbooks_connection
end
