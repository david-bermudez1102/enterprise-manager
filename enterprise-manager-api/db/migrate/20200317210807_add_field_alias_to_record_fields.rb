class AddFieldAliasToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :field_alias, :string
  end
end
