class FieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :field_type, :form_id
end
