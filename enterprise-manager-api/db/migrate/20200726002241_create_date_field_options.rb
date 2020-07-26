class CreateDateFieldOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :date_field_options do |t|
      t.references :field, foreign_key: true
      t.integer :fill_with
      t.integer :time_length
      t.integer :chosen_time
      t.integer :from_time
      t.datetime :custom_date
      t.integer :date_format
    end
  end
end
