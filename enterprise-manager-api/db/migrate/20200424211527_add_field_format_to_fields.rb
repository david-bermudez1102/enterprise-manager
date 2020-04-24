class AddFieldFormatToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :field_format, :integer
  end
end
