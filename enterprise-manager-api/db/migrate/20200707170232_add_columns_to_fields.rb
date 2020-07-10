class AddColumnsToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :hidden_in_form, :boolean, null: false, default:false
    add_column :fields, :hidden_in_records, :boolean, null: false, default:false
    add_column :fields, :allow_updates, :boolean, null: false, default:true
    add_column :fields, :read_only, :boolean, null: false, default:false
    add_column :fields, :min_length, :integer, default: 0
    add_column :fields, :max_length, :integer, default: 140
  end
end
