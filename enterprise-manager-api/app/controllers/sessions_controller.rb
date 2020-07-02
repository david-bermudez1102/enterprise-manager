class SessionsController < ApplicationController
  before_action :authenticate_user, only: %i[show]

  def create
    account = Account.find_by(
        "username = ? OR email = ?",
        params[:username],
        params[:username]
      )
    if account && account.activated && account.authenticate(params[:password]) && !account.disabled && !account.locked
      account.update(failed_attempts:0)
      token = encode_token({ id: account.id })
      cookies.signed[:jwt] = {
        value: token, httponly: true, expires: 24.hour.from_now,
      }
      account.organization.touch
      SessionChannel.broadcast_to(account, AccountSerializer.new(account))
      render json: AccountSerializer.new(account)
    elsif account && account.authenticate(params[:password]) && !account.activated && !account.locked
      render json: {token: account.activation.token}
    elsif account && account.authenticate(params[:password]) && account.disabled
      render json: {errors: ["Account has been temporarily disabled. Please contact admin."]}
    elsif account && account.accountable_type != "Admin" && !account.authenticate(params[:password]) && !account.locked && !account.disabled
      account_lock = Account.lock_account(account, request.host())
      render json: {errors: account_lock}
    elsif account && account.locked && !account.disabled
      render json: {errors: ["Account has been locked for security reasons. An email has been sent to you with the password reset instructions. If you don't have access to this email, please contact your admin."]}
    else
      render json: {errors: ["Email or password incorrect. Try again."]}
    end
  end

  def show
    render json: AccountSerializer.new(current_account)
  end

  def destroy
    if current_account
      current_account.organization.touch
      SessionChannel.broadcast_to(current_account, { errors: ["Not logged In"] })
      cookies.delete(:jwt)
      render json: { message: "success" }
    else
      render json: { error: "No account logged in" }
    end
  end
end
