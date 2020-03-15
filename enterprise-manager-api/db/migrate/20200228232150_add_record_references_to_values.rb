class AddRecordReferencesToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :record, foreign_key: true
  end
end
