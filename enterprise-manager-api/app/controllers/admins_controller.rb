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
    if current_account.update(admin_params)
      render json: AdminSerializer.new(admin, jwt: token, messages: ["Admin was added with success."])
    else
      render json: { errors: account.errors.full_messages }
    end
  end

  private

  def admin_params
    params.require(:admin).permit(:account_id, :name, :email, :password, :avatar, :avatar_margin_left, :avatar_margin_top)
  end
end
