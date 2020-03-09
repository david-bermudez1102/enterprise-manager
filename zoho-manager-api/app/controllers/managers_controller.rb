class ManagersController < ApplicationController
  before_action :set_admin

  def index
    managers = @admin.managers
    render json: ManagerSerializer.new(managers)
  end

  private
    def set_admin
      @admin = Admin.find(params[:admin_id])
    end
end
