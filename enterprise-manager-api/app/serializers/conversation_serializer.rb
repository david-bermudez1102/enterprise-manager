class ConversationSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id

  attribute :messages do |obj|
    MessageSerializer.new(obj.messages).serializable_hash[:data].map { |data| data[:attributes] }
  end

  attribute :is_minimized do |obj, params|
    obj.minimized_conversations.find_by(account: params[:account].id).is_minimized
  end

  attribute :is_open do |obj, params|
    obj.open_conversations.find_by(account: params[:account].id).is_open
  end
  
  attribute :open_conversation_id do |obj,params|
    obj.open_conversations.find_by(account: params[:account].id).id
  end
  
  attribute :minimized_id do |obj,params|
    obj.minimized_conversations.find_by(account: params[:account].id).id
  end

  attribute :typing_conversations do |obj|
    TypingConversationSerializer.new(obj.typing_conversations).serializable_hash[:data].map{ |data| data[:attributes] }
  end

  attribute :avatar_src do |obj|
    obj.recipients.first.avatar_src
  end

  attribute :key do |obj|
    obj.render_key
  end


  attribute :recipients
end
