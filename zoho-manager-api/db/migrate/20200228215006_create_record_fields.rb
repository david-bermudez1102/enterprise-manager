class CreateRecordFields < ActiveRecord::Migration[5.2]
  def change
    create_table :record_fields do |t|
      t.integer :field_type
      t.string :name
      t.references :form
      t.timestamps
    end
  end
end
