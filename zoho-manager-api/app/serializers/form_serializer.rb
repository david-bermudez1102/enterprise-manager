class FormSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :fields
end
