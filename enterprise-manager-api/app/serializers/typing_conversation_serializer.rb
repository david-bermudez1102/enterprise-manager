class TypingConversationSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id, :account_id, :is_typing

  attribute :name do |obj|
    obj.account.name
  end
end
