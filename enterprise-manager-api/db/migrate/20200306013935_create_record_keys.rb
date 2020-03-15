class CreateRecordKeys < ActiveRecord::Migration[5.2]
  def change
    create_table :record_keys do |t|
      t.references :field
      t.references :resource_field
      t.timestamps
    end
  end
end
