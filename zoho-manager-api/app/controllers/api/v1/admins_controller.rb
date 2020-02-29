module Api::V1
  class AdminsController < ApplicationController
    def create
      admin = Admin.new
      account = admin.build_account(admin_params)
      token = encode_token({ account_id: account.id })
      if account.save
        render json: AdminSerializer.new(admin, jwt: token)
      end
    end

    def index
      admins = Admin.all
      render json: AdminSerializer.new(admins)
    end

    private

    def admin_params
      params.require(:admin).permit(:name, :email, :password)
    end
  end
end
