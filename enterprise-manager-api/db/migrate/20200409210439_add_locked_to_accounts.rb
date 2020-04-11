class AddLockedToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :failed_attempts, :integer, null: false, default: 0
    add_column :accounts, :locked, :boolean, null: false, default:false
  end
end
