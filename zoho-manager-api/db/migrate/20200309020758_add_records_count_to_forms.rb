class AddRecordsCountToForms < ActiveRecord::Migration[5.2]
  def change
    add_column :forms, :records_count, :integer
  end
end
