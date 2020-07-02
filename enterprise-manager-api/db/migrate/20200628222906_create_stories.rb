class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories do |t|
      t.references :storiable, polymorphic: true
      t.references :account, foreign_key: true
      t.references :organization, foreign_key: true
      t.integer :action

      t.timestamps
    end
  end
end
