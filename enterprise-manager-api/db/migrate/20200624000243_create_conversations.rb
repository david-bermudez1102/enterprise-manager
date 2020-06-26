class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.text :render_key #used when the conversation is open for the first time
      t.timestamps
    end
  end
end
