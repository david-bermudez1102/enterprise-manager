class ManagersController < ApplicationController
  before_action :set_admin

  def index
    managers = @admin.managers
    render json: ManagerSerializer.new(managers)
  end

  def create
    manager = @admin.managers.new
    one_time_password = SecureRandom.hex
    account = manager.build_account(manager_params, password: one_time_password)
    render json: ManagerSerializer.new(manager, one_time_password: one_time_password) if account.save
  end

  private
    def manager_params
      params.require(:manager).permit(:name, :email)
    end

    def set_admin
      @admin = Admin.find(params[:admin_id])
    end
end
