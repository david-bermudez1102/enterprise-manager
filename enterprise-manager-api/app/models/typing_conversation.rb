class TypingConversation < ApplicationRecord
  belongs_to :conversation
  belongs_to :account
end
