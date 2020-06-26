class Conversation < ApplicationRecord
  has_many :messages, dependent: :nullify
  has_many :minimized_conversations, dependent: :nullify
  has_many :open_conversations, dependent: :nullify
  has_many :typing_conversations, dependent: :nullify
  has_many :accounts, through: :open_conversations

  accepts_nested_attributes_for :messages, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :minimized_conversations, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :open_conversations, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :typing_conversations, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  def recipients
    accounts.select(:id, :name)
  end
end
