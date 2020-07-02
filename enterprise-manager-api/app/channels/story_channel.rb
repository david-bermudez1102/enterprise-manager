class StoryChannel < ApplicationCable::Channel
  def subscribed
    @organization = current_account.organization
    stream_for @organization
  end

  def received(data)
    StoryChannel.broadcast_to(@organization, { stories:serialized_data })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private
    def serialized_data
      StorySerializer.new(@organization.stories.includes(:likes, :account, :storiable, :comments).order(id: :desc)).serializable_hash[:data].map { |data| data[:attributes] }
    end
end
