class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  include ::ActionController::MimeResponds
  include Pundit
  before_action :set_current_account
  before_action :set_paper_trail_whodunnit
  
  rescue_from Exception, with: :exception_handler

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end

  def auth_header
    request.headers['Authorization']
  end

  def current_account
    decoded_hash = decoded_token(cookies.signed[:jwt])
    if decoded_hash
      account_id = decoded_hash[0]['id']
      @current_account ||= Account.find(account_id)
    else
      nil
    end
  rescue
    nil
  end

  def current_user
    current_account
  end

  def encode_token(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.credentials.dig(:secret_key_base))
  end

  def decoded_token(token)
    begin
        JWT.decode(token, Rails.application.credentials.dig(:secret_key_base), true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
  end

  def authenticate_user
    Rails.logger.info "DECODED TOKEN: #{Rails.application.credentials.dig(:secret_key_base)}"
    
    if current_account.nil?
      SessionChannel.broadcast_to(current_account, { errors: ["Not logged in"]})
      render json: { errors: ['Not Authorized'] }
    else 
      current_account
    end
  end

  def exception_handler(exception)
    case exception
      when ActiveRecord::RecordNotFound
        render json: "#{exception.model} doesn't exist or has been deleted", status: :not_found
      when ActiveRecord::RecordInvalid, ActiveRecord::Rollback
        render json: exception, status: :unprocessable_entity
      when Pundit::NotAuthorizedError
        render json: "You are not authorized to see this page.", status: :unauthorized
      else
        render json: exception, status: :internal_server_error
      end
  end

  private

    def set_current_account
      Current.account = current_account
    end
end
