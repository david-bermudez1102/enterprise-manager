class StoriesController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_stories

  def index
    render json: serialized_stories
  end

  def update
    story = @stories.find(params[:id])
    story.update!(story_params)
    StoryChannel.broadcast_to(@organization, { stories: serialized_stories })
    render json: StorySerializer.new(story).serializable_hash[:data][:attributes]
  end

  private

    def story_params
      params.require(:story).permit(:id, :likes_attributes => [:id, :account_id, :_destroy], :comments_attributes => [:id, :account_id, :content, :_destroy, :likes_attributes => [:id, :account_id, :_destroy]])
    end
  
    def set_organization
      @organization = current_account.organization
    end

    def set_stories
      @stories = @organization.stories.includes(:likes, :account, :storiable, :comments).order(id: :desc)
    end

    def serialized_stories
      StorySerializer.new(@stories).serializable_hash[:data].map { |data| data[:attributes] }
    end
end
