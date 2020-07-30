class AddContentAfterDependentsToValues < ActiveRecord::Migration[5.2]
  def change
    add_column :values, :content_after_dependents, :string
  end
end
