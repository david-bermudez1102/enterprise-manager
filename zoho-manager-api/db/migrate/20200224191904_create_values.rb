class CreateValues < ActiveRecord::Migration[5.2]
  def change
    create_table :values do |t|
      t.field :references
      t.string :content

      t.timestamps
    end
  end
end
