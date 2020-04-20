class AddAcceptsDecimalsToFields < ActiveRecord::Migration[5.2]
  def change
    add_column :fields, :accepts_decimals, :boolean, null: false, default:false
  end
end
