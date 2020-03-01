class CreateManagers < ActiveRecord::Migration[5.2]
  def change
    create_table :managers, &:timestamps
  end
end
