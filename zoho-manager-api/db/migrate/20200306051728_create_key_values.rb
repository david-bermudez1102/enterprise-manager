class CreateKeyValues < ActiveRecord::Migration[5.2]
  def change
    create_table :key_values do |t|
      t.references :record_key, foreign_key: true
      t.references :record_value, foreign_key: true
      t.references :option, foreign_key: true
      t.string :value
      t.timestamps
    end
  end
end
