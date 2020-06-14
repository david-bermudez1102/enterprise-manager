class CreateExclusions < ActiveRecord::Migration[5.2]
  def change
    create_table :exclusions do |t|
      t.references :account, foreign_key: true
      t.references :permission, foreign_key: true
      t.integer :exclusion_type

      t.timestamps
    end
  end
end
