class SessionsController < ApplicationController
  def create
    account = Account.find_by(
        "username = ? OR email = ?",
        params[:username],
        params[:username]
      )
    if account && account.activated && account.authenticate(params[:password]) && !account.disabled
      token = encode_token({ id: account.id })
      cookies.signed[:jwt] = {
        value: token, httponly: true, expires: 24.hour.from_now,
      }
      render json: AccountSerializer.new(account)
    elsif account && account.authenticate(params[:password]) && !account.activated
      render json: {token: account.activation.token}
    elsif account && account.authenticate(params[:password]) && account.disabled
      render json: {errors: ["Account has been temporarily disabled. Please contact admin."]}
    else
      render json: {errors: ["Email or password incorrect. Try again."]}
    end
  end

  def show
    if current_account
      render json: AccountSerializer.new(current_account)
    else
      render json: { errors: ["Not logged in"] }
    end
  end

  def destroy
    if current_account
      cookies.delete(:jwt)
      render json: { message: "success" }
    else
      render json: { error: "No account logged in" }
    end
  end
end
