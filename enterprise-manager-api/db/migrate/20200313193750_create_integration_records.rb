class CreateIntegrationRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :integration_records do |t|
      t.references :connection, foreign_key: true
      t.string :external_id
      t.references :record, foreign_key: true
      t.references :zoho_integration_record
      t.references :quickbooks_integration_record
      t.timestamps
    end
  end
end
