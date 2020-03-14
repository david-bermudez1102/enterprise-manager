class AddRefreshTokenToIntegrations < ActiveRecord::Migration[5.2]
  def change
    add_column :integrations, :refresh_token, :text
  end
end
