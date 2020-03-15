class AddOrganizationReferencesToAdmin < ActiveRecord::Migration[5.2]
  def change
    add_reference :admins, :organization, foreign_key: true
  end
end
