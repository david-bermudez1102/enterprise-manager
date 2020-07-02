class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  belongs_to :account
  has_many :likes, as: :likeable
  validate :account_is_own
  validates :content, presence: true

  accepts_nested_attributes_for :likes, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  private
    def account_is_own
      if account_id != Current.account.id
        errors.add(:account, "You can't comment on behalf of someone else!")
      end
    end
end
