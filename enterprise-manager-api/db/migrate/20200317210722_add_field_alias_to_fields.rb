class AddFieldAliasToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :field_alias, :string
  end
end
