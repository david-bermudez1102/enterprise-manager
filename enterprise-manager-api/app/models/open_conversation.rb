class OpenConversation < ApplicationRecord
  belongs_to :conversation
  belongs_to :account
  validate :account_is_own, on: [:update, :destroy]

  private
    def account_is_own
      if self[:account_id] != Current.account.id
        errors.add(:account, "An error ocurred while sending this message. Please try again.")
      end
    end
end
