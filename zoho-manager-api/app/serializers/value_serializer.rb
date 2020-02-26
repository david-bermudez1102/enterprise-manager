class ValueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :content, :field_id, :record_id
end
