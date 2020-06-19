class Exclusion < ApplicationRecord
  belongs_to :account
  belongs_to :permission
  enum exclusion_type: %w[createPrivilege updatePrivilege deletePrivilege readPrivilege insertPrivilege]

  validate :cannot_exclude_own_account

  def cannot_exclude_own_account
    if account.id == Current.account.id
      errors.add(:account, "You cannot exclude yourself")
    end
  end
 
end
