class AddCombinedFieldsToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :combined_fields, :text, array: true, default: [].to_yaml
  end
end
