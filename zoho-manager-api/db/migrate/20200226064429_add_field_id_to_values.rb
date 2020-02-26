class AddFieldIdToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :field, foreign_key: true
    add_reference :values, :record, foreign_key: true
  end
end
