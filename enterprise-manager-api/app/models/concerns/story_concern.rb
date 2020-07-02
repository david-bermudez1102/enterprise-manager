module StoryConcern
  extend ActiveSupport::Concern

  included do
    has_many :stories, as: :storiable, dependent: :delete_all
    before_create :story_created
    before_commit :story_updated, on: %i[update]
    after_create :stream_stories
    after_commit :stream_stories, on: %i[update]
  end

  private
    def story_created
      stories.build(action:"createSubject", account:Current.account, organization:Current.account.organization)
    end

    def story_updated
      stories.build(action:"updateSubject", account:Current.account, organization:Current.account.organization)
    end

    def stream_stories
      StoryChannel.broadcast_to(organization, { stories: serialized_data })
    end

    def serialized_data
      StorySerializer.new(organization.stories.includes(:likes, :account, :storiable, :comments).order(id: :desc)).serializable_hash[:data].map { |data| data[:attributes] }
    end
    
end