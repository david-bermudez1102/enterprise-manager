class CreateFieldDependents < ActiveRecord::Migration[5.2]
  def change
    create_table :field_dependents do |t|
      t.references :field, foreign_key: true
      t.references :dependent_field
      t.references :resource_field
      t.references :sub_dependent
      t.references :sub_dependent_option
      t.boolean :all_values_same_operation, null: false, default:true
      t.boolean :is_percentage, null: false, default:false
      t.boolean :set_as_start_value, null: false, default:false
      t.integer :operation
      t.text :content

      t.timestamps
    end
  end
end
