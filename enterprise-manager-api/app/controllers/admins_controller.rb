class AdminsController < ApplicationController
  def create
    admin = Admin.new
    account = admin.build_account(admin_params)
    token = encode_token({ account_id: account.id })
    if account.save && admin.save
      render json: AdminSerializer.new(admin, jwt: token, messages: ["Admin was added with success."])
    else
      render json: { errors: account.errors.full_messages }
    end
  end

  def index
    admins = Admin.all
    render json: AdminSerializer.new(admins)
  end

  def update
    admin = Admin.joins(:account).find_by(accounts:{id:current_account.id})
    current_account.avatar.purge_later if admin_params[:avatar]
    if current_account.update(admin_params)
      render json: AdminSerializer.new(admin, messages: ["Profile was updated with success."])
    else
      render json: { errors: current_account.errors.full_messages }
    end
  end

  private

  def admin_params
    params.require(:admin).permit(:name, :email, :password, :avatar, :avatar_margin_left, :avatar_margin_top)
  end
end
