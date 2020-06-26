class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.references :conversation, foreign_key: true
      t.references :account, foreign_key: true
      t.text :content
      t.boolean :is_read, null: false, default:false
      t.text :render_key #used in frontend when message is sent but not commited
      t.timestamps
    end
  end
end
