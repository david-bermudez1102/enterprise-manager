class SessionChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_account
  end

  def received(data)
    SessionChannel.broadcast_to(current_account, AccountSerializer.new(current_account))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
