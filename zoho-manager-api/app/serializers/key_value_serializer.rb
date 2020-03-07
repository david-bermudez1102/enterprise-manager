class KeyValueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :value, :record_value_id
end
