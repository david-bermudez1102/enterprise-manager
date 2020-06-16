class CreateOrganizationRoots < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_roots do |t|
      t.references :organization, foreign_key: true
      t.references :root, foreign_key: true

      t.timestamps
    end
  end
end
