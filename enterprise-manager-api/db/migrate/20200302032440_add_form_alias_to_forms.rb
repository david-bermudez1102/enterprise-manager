class AddFormAliasToForms < ActiveRecord::Migration[5.2]
  def change
    add_column :forms, :form_alias, :string
  end
end
