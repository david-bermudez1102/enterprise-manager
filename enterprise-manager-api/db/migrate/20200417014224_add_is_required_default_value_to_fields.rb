class AddIsRequiredDefaultValueToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :is_required, :boolean
    add_column :fields, :default_value, :string
  end
end
