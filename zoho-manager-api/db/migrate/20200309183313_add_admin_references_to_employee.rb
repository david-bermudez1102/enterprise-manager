class AddAdminReferencesToEmployee < ActiveRecord::Migration[5.2]
  def change
    add_reference :employees, :admin, foreign_key: true
  end
end
