module Api::V1
  class ApplicationController < ActionController::API
    include ::ActionController::Cookies

    def auth_header
      request.headers["Authorization"]
    end

    def current_account
      decoded_hash = decoded_token
      if decoded_hash
        account_id = decoded_hash[0]["id"]
        @_current_account ||= Account.find_by(id: account_id)
      end
    end

    def encode_token(payload)
      JWT.encode(payload, "my_secret")
    end

    def decoded_token
      if cookies.signed[:jwt]
        token = cookies.signed[:jwt]
        begin
          JWT.decode(token, "my_secret", true, algorithm: "HS256")
        rescue JWT::DecodeError
          []
        end
      end
    end

    def authenticate_user
      jwt = cookies.signed[:jwt]
      decode_jwt(jwt)
    end
  end
end
