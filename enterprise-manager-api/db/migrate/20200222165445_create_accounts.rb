class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :username
      t.string :email
      t.string :password_digest
      t.references :accountable, polymorphic: true

      t.timestamps
    end
  end
end
