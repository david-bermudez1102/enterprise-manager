class CreateTypingConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :typing_conversations do |t|
      t.references :conversation, foreign_key: true
      t.references :account, foreign_key: true
      t.boolean :is_typing, null: false, default:false

      t.timestamps
    end
  end
end
