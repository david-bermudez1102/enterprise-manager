class ValueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :content, :record_field_id, :record_id, :form_id
  attribute :key_value do |value|
    if value.record_value
      record_key = KeyValueSerializer.new(value.record_value.key_value).serializable_hash[:data]
      record_key ? record_key[:attributes] : nil
    end
  end
end
