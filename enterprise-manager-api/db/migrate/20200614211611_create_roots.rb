class CreateRoots < ActiveRecord::Migration[5.2]
  def change
    create_table :roots, &:timestamps
  end
end
