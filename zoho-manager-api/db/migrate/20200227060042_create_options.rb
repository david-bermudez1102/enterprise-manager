class CreateOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :options do |t|
      t.references :field, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
