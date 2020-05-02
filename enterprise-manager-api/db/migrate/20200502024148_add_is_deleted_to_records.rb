class AddIsDeletedToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :is_deleted, :boolean, null: false, default:false
  end
end
