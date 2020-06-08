class AddZohoFieldNameToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :zoho_field_name, :string
  end
end
