class SessionChannel < ApplicationCable::Channel
  def subscribed
    @current_account = current_account
    stream_for @current_account
  end

  def received(data)
    PagePermissionChannel.broadcast_to(@current_account, AccountSerializer.new(@current_account))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
