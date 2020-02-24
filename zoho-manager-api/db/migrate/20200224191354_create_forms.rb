class CreateForms < ActiveRecord::Migration[5.2]
  def change
    create_table :forms do |t|
      t.organization :references
      t.string :name

      t.timestamps
    end
  end
end
