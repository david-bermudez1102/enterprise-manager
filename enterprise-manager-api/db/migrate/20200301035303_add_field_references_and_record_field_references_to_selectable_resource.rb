class AddFieldReferencesAndRecordFieldReferencesToSelectableResource < ActiveRecord::Migration[
  5.2
]
  def change
    add_reference :selectable_resources, :record_field, foreign_key: true
    add_reference :selectable_resources, :field, foreign_key: true
  end
end
