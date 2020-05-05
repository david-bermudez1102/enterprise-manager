class ApplicationController < ActionController::API
  include ::ActionController::Cookies

  def auth_header
    request.headers['Authorization']
  end

  def current_account
    decoded_hash = decoded_token(cookies.signed[:jwt])
    if decoded_hash
      account_id = decoded_hash[0]['id']
      @current_account ||= Account.find_by(id: account_id)
    else
      nil
    end
  end

  def encode_token(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def decoded_token(token)
    begin
        JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
  end

  def authenticate_user
    if current_account.nil?
      render json: { errors: ['Not Authorized'] }
    end
  end
end
