class FormSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :form_alias, :organization_id, :records_count
end
