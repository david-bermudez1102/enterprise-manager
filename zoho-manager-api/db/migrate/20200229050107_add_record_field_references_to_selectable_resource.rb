class AddRecordFieldReferencesToSelectableResource < ActiveRecord::Migration[5.2]
  def change
    add_reference :selectable_resources, :record_field, foreign_key: true
  end
end
