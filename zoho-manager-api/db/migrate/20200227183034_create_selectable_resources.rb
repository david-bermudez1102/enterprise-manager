class CreateSelectableResources < ActiveRecord::Migration[5.2]
  def change
    create_table :selectable_resources do |t|
      t.references :form
      t.references :field

      t.timestamps
    end
  end
end
