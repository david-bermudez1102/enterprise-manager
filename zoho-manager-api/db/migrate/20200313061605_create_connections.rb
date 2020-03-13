class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.references :integration, foreign_key: true
      t.references :form, foreign_key: true
      t.integer :type

      t.timestamps
    end
  end
end
