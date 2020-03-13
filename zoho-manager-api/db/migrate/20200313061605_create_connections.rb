class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.string :name
      t.references :integration, foreign_key: true
      t.references :form, foreign_key: true
      t.integer :connection_type

      t.timestamps
    end
  end
end
