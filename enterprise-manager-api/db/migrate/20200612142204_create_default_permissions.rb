class CreateDefaultPermissions < ActiveRecord::Migration[5.2]
  def change
    create_table :default_permissions do |t|
      t.references :role, foreign_key: true
      t.timestamps
    end
  end
end
