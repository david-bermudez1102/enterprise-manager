class AddIsPercentageFromDependentColumnToFieldDependents < ActiveRecord::Migration[5.2]
  def change
    add_column :field_dependents, :is_percentage_from_dependent, :boolean, null: false, default:false
  end
end
