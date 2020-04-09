class AddLockedToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :locked, :boolean, null: false, default:false
  end
end
