class FormSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
end
