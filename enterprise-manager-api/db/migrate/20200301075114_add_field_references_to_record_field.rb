class AddFieldReferencesToRecordField < ActiveRecord::Migration[5.2]
  def change
    add_reference :record_fields, :field, foreign_key: true
  end
end
