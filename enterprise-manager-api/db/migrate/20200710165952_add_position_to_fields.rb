class AddPositionToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :position, :integer, null: false, default:0
    Form.all.each do |form|
      form.fields.order(:updated_at).each.with_index(1) do |field, index|
        field.update_column :position, index
      end
    end
  end
end
