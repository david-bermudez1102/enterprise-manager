class AddOptionValueReferencesToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :record_value
    add_reference :values, :option, foreign_key: true
  end
end
