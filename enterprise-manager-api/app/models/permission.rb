class Permission < ApplicationRecord
  belongs_to :permissionable, polymorphic: true
  has_many :assignments, dependent: :delete_all
  has_many :roles, through: :assignments

  accepts_nested_attributes_for :assignments, update_only: true, allow_destroy: true, reject_if: proc { |attributes| 
    attributes.all? do |key, value| 
      key == "_destroy" || value.blank?
    end
  }

  validates :assignments, :length => { :minimum => 1 }
end
