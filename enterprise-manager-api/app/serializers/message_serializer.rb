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

  attribute :key do |obj|
    obj.render_key
  end

  attribute :sent do
    true
  end

  attribute :status do
    1
  end
end
