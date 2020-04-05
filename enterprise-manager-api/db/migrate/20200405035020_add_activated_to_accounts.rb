class AddActivatedToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :activated, :boolean
  end
end
