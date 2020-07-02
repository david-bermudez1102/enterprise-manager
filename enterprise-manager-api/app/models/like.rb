class Like < ApplicationRecord
  belongs_to :likeable, polymorphic: true
  belongs_to :account
  validate :account_is_own
  validates :account, uniqueness: { scope: :likeable, message: "You've already liked this content." }

  private
    def account_is_own
      if account_id != Current.account.id
        errors.add(:account, "You can't like on behalf of someone else!")
      end
    end
end
