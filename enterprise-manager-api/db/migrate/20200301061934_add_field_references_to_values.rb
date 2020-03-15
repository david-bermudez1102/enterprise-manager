class AddFieldReferencesToValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :values, :field, foreign_key: true
  end
end
