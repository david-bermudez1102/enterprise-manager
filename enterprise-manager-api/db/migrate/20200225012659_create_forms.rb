class CreateForms < ActiveRecord::Migration[5.2]
  def change
    create_table :forms do |t|
      t.string :name
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
