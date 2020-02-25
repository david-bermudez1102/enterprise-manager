class FieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :field_type 
end
