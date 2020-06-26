class MinimizedConversation < ApplicationRecord
  belongs_to :conversation
  belongs_to :account
end
