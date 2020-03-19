class PopulateFormRecordsCount < ActiveRecord::Migration[5.2]
  def change
    Form.find_each do |form|
      Form.reset_counters(form.id, :records)
    end
  end
end
