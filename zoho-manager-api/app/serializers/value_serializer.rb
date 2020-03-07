class ValueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :content, :record_field_id, :record_id
  attribute :key_value_id do |value|
    if value.record_value
      value.record_value.key_value_id
    end
  end
end
