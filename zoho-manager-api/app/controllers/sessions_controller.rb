class SessionsController < ApplicationController
  def create
    account = Account.find_by("username = ? OR email = ?", params[:username], params[:username])
    if account && account.authenticate(params[:password])
      token = encode_token({id: account.id})
      cookies.signed[:jwt] = {value:  token, httponly: true, expires: 1.hour.from_now}
      render json: AccountSerializer.new(account)
    end
  end

  def show
    if current_account
      render json: AccountSerializer.new(current_account)
    else
      render json: {error:"Not logged in"}
    end
  end

  def destroy
    cookies.delete(:jwt)
  end
end
