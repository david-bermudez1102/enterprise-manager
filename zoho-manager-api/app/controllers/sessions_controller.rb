class SessionsController < ApplicationController
  def create
    account = Account.find_by("username = ? OR email = ?", params[:username], params[:username])
    if account && account.authenticate(params[:password])
      token = encode_token({account_id: account.id})
      render json: AccountSerializer.new(account, jwt: token)
    end
  end
end
