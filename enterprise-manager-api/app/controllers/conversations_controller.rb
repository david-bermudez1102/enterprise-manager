class ConversationsController < ApplicationController
  before_action :authenticate_user

  def index
    if stale?(current_account.conversations)
      render json: serialized_conversations(current_account)
    end
  end

  def create
    conversation = current_account.conversations.build(conversation_params)
    conversation.save!
    conversation.accounts.where.not(id:current_account.id).map do |account| 
      ConversationChannel.broadcast_to(account, {conversations:serialized_conversations(account)}) 
    end
    render json: serialized_conversation(conversation)
  end

  def update
    conversation = current_account.conversations.includes({ :messages => [:account] }, :minimized_conversations, :open_conversations, :accounts).find(params[:id])
    conversation.update!(conversation_params)
    conversation.accounts.where.not(id:current_account.id).map { |account| ConversationChannel.broadcast_to(account, {conversations:serialized_conversations(account)}) }
    render json: serialized_conversation(conversation)
  end

  private
    def conversation_params
      params.require(:conversation).permit(:render_key, messages_attributes: [:id, :account_id, :content, :is_read, :render_key], minimized_conversations_attributes: [:id, :account_id, :is_minimized], typing_conversations_attributes: [:id, :account_id, :is_typing], open_conversations_attributes: [:id, :account_id, :is_open])
    end

    def serialized_conversation(conversation)
      ConversationSerializer.new(conversation, { params: { account: current_account } }).serializable_hash[:data][:attributes]
    end

    def serialized_conversations(account)
      conversations = account.conversations.includes({ :messages => [:account] }, :minimized_conversations, :open_conversations, :typing_conversations, :accounts)

      ConversationSerializer.new(conversations, { params: { account: account } }).serializable_hash[:data].map { |data| data[:attributes] }
    end
end
