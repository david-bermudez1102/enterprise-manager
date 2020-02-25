class FieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :field_type, :form_id
end
