class AddAcceptsDecimalsToRecordFields < ActiveRecord::Migration[5.2]
  def change
    add_column :record_fields, :accepts_decimals, :boolean, null: false, default:false
  end
end
