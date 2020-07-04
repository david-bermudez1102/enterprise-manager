class AddIsUniqToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :is_uniq, :boolean, null: false, default:false
  end
end
