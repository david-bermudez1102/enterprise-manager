class ConversationChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_account 
  end

  def received(data)
    ConversationChannel.broadcast_to(current_account, {conversations: serialized_conversations})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def serialized_conversations
    ConversationSerializer.new(current_account.conversations).serializable_hash[:data].map { |data| data[:attributes] }
  end

end
