class AddAccountReferencesToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :account, foreign_key: true
  end
end
