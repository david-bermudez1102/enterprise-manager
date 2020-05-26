class AddAccountsReferencesToRecords < ActiveRecord::Migration[5.2]
  def change
    add_reference :records, :account, foreign_key: true
  end
end
