class ValueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :field_id, :content
end
