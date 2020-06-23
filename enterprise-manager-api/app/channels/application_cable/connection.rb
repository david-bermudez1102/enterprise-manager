module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_account

    def connect
      self.current_account = find_verified_account
    end

    private
      def find_verified_account
        decoded_hash = decoded_token(cookies.signed[:jwt])
        if decoded_hash
          account_id = decoded_hash[0]['id']
          current_account = Account.find(account_id)
          current_account
        else
          reject_unauthorized_connection
        end
      end

      def decoded_token(token)
        begin
          JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
        rescue JWT::DecodeError
          nil
        end
      end
  end
end
