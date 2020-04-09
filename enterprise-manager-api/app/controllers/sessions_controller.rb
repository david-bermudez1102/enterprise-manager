class SessionsController < ApplicationController
  def create
    account = Account.find_by(
        "username = ? OR email = ?",
        params[:username],
        params[:username]
      )
    if account && account.activated && account.authenticate(params[:password]) && !account.disabled && !account.locked
      token = encode_token({ id: account.id })
      cookies.signed[:jwt] = {
        value: token, httponly: true, expires: 24.hour.from_now,
      }
      render json: AccountSerializer.new(account)
    elsif account && account.authenticate(params[:password]) && !account.activated && !account.locked
      render json: {token: account.activation.token}
    elsif account && account.authenticate(params[:password]) && account.disabled
      render json: {errors: ["Account has been temporarily disabled. Please contact admin."]}
    elsif account && account.accountable_type != "Admin" && !account.authenticate(params[:password]) && !account.locked && !account.disabled
      if account.failed_attempts == 3
        account.locked = true
        render json: {errors: ["Account has been locked for security reasons. Please contact admin."]}
      else
        render json: {errors: ["Your password is incorrect. Your account will be locked after #{3-account.failed_attempts} more failed attempts."]}
        account.failed_attempts = account.failed_attempts + 1
      end
      account.save
    elsif account && account.locked && !account.disabled
      render json: {errors: ["Account has been locked for security reasons. Please contact admin."]}
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
