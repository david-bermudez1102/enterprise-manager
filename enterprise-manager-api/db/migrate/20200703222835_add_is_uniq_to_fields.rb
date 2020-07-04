class AddIsUniqToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :is_uniq, :boolean, null: false, default:false
  end
end
