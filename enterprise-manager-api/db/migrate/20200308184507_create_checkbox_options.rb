class CreateCheckboxOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :checkbox_options do |t|
      t.references :option, foreign_key: true
      t.references :value, foreign_key: true

      t.timestamps
    end
  end
end
