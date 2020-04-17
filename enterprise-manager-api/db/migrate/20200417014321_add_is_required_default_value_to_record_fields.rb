class AddIsRequiredDefaultValueToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :is_required, :boolean
    add_column :record_fields, :default_value, :string
  end
end
