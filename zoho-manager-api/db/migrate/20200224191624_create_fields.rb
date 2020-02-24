class CreateFields < ActiveRecord::Migration[5.2]
  def change
    create_table :fields do |t|
      t.integer :field_type
      t.string :name
      t.references :form

      t.timestamps
    end
  end
end
