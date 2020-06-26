class OpenConversationSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id

  attribute :conversation do |obj|
    ConversationSerializer.new(obj.conversation).serializable_hash[:data][:attributes]
  end

end
