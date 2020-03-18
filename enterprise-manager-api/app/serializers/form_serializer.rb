class FormSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :form_alias, :organization_id, :records_count, :zoho_connection, :quickbooks_connection

  attribute :messages do |object, params|
    params[:messages]
  end
end
