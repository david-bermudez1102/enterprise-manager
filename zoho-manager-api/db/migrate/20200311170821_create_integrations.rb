class CreateIntegrations < ActiveRecord::Migration[5.2]
  def change
    create_table :integrations do |t|
      t.string :auth_token
      t.references :organization
      t.references :account
      t.references :zoho_integration
      t.references :quickbooks_integration
      t.timestamps
    end
  end
end
