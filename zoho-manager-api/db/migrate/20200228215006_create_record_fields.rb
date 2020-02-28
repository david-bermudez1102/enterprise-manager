class CreateRecordFields < ActiveRecord::Migration[5.2]
  def change
    create_table :record_fields do |t|
      t.references :record, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
