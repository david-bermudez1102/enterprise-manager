class Message < ApplicationRecord
  belongs_to :conversation, touch: true
  belongs_to :account
  validate :only_is_read_is_changed
  validate :account_is_own
  validates :content, presence: true
  
  after_save :user_not_typing_anymore
  after_save :mark_rest_as_read

  def account_is_own
    if self[:account_id] != Current.account.id && !self.persisted?
      errors.add(:account, "An error ocurred while sending this message. Please try again.")
    end
  end

  def user_not_typing_anymore
    conversation.messages.where.not(account:account).update_all(is_read:true)
  end

  def mark_rest_as_read
    conversation.typing_conversations.where(account:account).update_all(is_typing:false)
  end

  private

  def only_is_read_is_changed
    if (conversation_id_changed? || account_id_changed? || content_changed?  || render_key_changed?) && self.persisted?
      errors.add(:conversation, "Changes to this message are not allowed!")
    end
  end
end
