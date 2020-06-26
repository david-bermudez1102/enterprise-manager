class ConversationsController < ApplicationController
  before_action :authenticate_user

  def index
    render json: serialized_conversations(current_account)
  end

  def create
    conversation = current_account.conversations.build(conversation_params)
    conversation.save!
    conversation.accounts.map do |account| 
      ConversationChannel.broadcast_to(account, {conversations:serialized_conversations(account)}) 
    end
    render json: serialized_conversation(conversation)
  end

  def update
    conversation = current_account.conversations.includes({ :messages => [:account] }, :minimized_conversations, :open_conversations, :accounts).find(params[:id])
    conversation.update!(conversation_params)
    conversation.accounts.map { |account| ConversationChannel.broadcast_to(account, {conversations:serialized_conversations(account)}) }
    render json: serialized_conversation(conversation)
  end

  private
    def conversation_params
      params.require(:conversation).permit(:render_key, messages_attributes: [:id, :account_id, :content, :is_read], minimized_conversations_attributes: [:id, :account_id, :is_minimized], typing_conversations_attributes: [:id, :account_id, :is_typing], open_conversations_attributes: [:id, :account_id, :is_open])
    end

    def serialized_conversation(conversation)
      ConversationSerializer.new(conversation, { params: { account: current_account } }).serializable_hash[:data][:attributes]
    end

    def serialized_conversations(account)
      conversations = account.conversations.includes({ :messages => [:account] }, :minimized_conversations, :open_conversations, :typing_conversations, :accounts)

      ConversationSerializer.new(conversations, { params: { account: account } }).serializable_hash[:data].map { |data| data[:attributes] }
    end
end
