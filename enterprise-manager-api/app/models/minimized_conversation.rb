class MinimizedConversation < ApplicationRecord
  belongs_to :conversation, touch: true
  belongs_to :account
end
