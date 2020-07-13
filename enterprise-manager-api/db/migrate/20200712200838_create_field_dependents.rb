class CreateFieldDependents < ActiveRecord::Migration[5.2]
  def change
    create_table :field_dependents do |t|
      t.references :field, foreign_key: true
      t.references :dependent_field
      t.integer :operation
      t.text :content

      t.timestamps
    end
  end
end
