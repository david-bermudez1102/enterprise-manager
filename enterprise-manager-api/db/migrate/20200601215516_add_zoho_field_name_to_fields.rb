class AddZohoFieldNameToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :zoho_field_name, :string
  end
end
