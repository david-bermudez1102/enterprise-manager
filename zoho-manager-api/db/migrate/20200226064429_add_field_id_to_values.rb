class AddFieldIdToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :record_field, foreign_key: true
  end
end
