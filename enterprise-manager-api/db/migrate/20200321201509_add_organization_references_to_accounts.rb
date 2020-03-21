class AddOrganizationReferencesToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_reference :accounts, :organization, foreign_key: true
  end
end
