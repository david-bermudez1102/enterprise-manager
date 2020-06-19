class CreatePagePermissions < ActiveRecord::Migration[5.2]
  def change
    create_table :page_permissions do |t|
      t.integer :page_name
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
