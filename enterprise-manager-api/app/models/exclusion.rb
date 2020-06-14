class Exclusion < ApplicationRecord
  belongs_to :account
  belongs_to :permission
  enum exclusion_type: %w[createPrivilege updatePrivilege deletePrivilege readPrivilege insertPrivilege]
end
