class FormSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :fields, :organization_id
end
