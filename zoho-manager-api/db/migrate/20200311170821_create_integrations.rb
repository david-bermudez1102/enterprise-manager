class CreateIntegrations < ActiveRecord::Migration[5.2]
  def change
    create_table :integrations do |t|
      t.integer :type
      t.string :auth_token
      t.references :organization, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
