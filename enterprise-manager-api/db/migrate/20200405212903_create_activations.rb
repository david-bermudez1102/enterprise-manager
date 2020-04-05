class CreateActivations < ActiveRecord::Migration[5.2]
  def change
    create_table :activations do |t|
      t.references :account, foreign_key: true
      t.text :token

      t.timestamps
    end
  end
end
