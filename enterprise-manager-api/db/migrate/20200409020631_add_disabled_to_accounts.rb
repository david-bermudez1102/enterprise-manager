class AddDisabledToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :disabled, :boolean, null: false, default: false
  end
end
