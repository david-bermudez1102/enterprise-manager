class ValueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :content, :record_field_id, :record_id
end
