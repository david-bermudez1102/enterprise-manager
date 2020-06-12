class CreateAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.boolean :create_privilege, null: false, default:false
      t.boolean :update_privilege, null: false, default:false
      t.boolean :delete_privilege, null: false, default:false, null: false, default:false
      t.boolean :insert_privilege, null: false, default:false
      t.boolean :read_privilege, null: false, default:false
      t.references :role, foreign_key: true
      t.references :permission, foreign_key: true

      t.timestamps
    end
  end
end
