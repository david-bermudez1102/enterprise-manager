class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees, &:timestamps
  end
end
