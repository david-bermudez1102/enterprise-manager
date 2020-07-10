class Story < ApplicationRecord
  belongs_to :storiable, polymorphic: true
  belongs_to :account
  belongs_to :organization
  has_many :likes, as: :likeable, dependent: :delete_all
  has_many :comments, -> { order('created_at DESC') }, as: :commentable, dependent: :delete_all

  accepts_nested_attributes_for :likes, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :comments, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  enum action: ["createSubject", "updateSubject", "deleteSubject"]
  
end