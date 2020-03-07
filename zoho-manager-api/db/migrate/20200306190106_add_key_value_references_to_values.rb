class AddKeyValueReferencesToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :key_value, foreign_key: true
  end
end
