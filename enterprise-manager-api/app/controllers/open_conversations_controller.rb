class OpenConversationsController < ApplicationController
  before_action :authenticate_user

  def index
    render json: serialized_open_conversations
  end

  private
    def serialized_open_conversations
      OpenConversationSerializer.new(current_account.open_conversations).serializable_hash[:data].map { |data| data[:attributes] }
    end
end
