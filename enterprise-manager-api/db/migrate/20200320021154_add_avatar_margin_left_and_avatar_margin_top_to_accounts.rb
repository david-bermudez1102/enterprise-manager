class AddAvatarMarginLeftAndAvatarMarginTopToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :avatar_margin_left, :float
    add_column :accounts, :avatar_margin_top, :float
  end
end
