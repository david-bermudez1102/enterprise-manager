class MessageSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id, :content, :is_read

  attribute :account do |obj|
    obj.account.attributes.slice("id", "name")
  end

  attribute :avatar_src do |obj|
    obj.account.avatar_src
  end
end
