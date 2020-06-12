class CreatePermissions < ActiveRecord::Migration[5.2]
  def change
    create_table :permissions do |t|
      t.references :permissionable, polymorphic: true

      t.timestamps
    end
  end
end
