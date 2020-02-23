class AdminsController < ApplicationController
  def create
    admin = Admin.new
    account = admin.build_account(admin_params)
    if account.save
      render json: AdminSerializer.new(admin)
    end
  end

  private
  def admin_params
    params.require(:admin).permit(:name,:email,:password)
  end
end
