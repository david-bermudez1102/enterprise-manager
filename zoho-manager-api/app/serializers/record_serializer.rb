class RecordSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :form_id
  
  link :values do |object|
    ValueSerializer.new(object.values).serializable_hash[:data].map do |value|
      value[:attributes]
    end
  end
end
