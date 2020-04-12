class CreateOrganizations < ActiveRecord::Migration[5.2]
  def change
    create_table :organizations do |t|
      t.string :name
      t.float :logo_margin_left
      t.float :logo_margin_top
      t.float :logo_width_ratio
      t.timestamps
    end
  end
end
