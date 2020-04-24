class AddFieldFormatToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :field_format, :integer
  end
end
