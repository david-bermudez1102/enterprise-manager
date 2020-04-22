class AddCombinedFieldsToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :combined_fields, :text, array: true, default: [].to_yaml
  end
end
