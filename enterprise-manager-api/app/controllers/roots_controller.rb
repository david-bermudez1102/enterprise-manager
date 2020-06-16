class RootsController < ApplicationController
  before_action :set_token, only: %i[create]

  def create
    root = Root.new
    account = root.build_account(root_params)
    token = encode_token({ account_id: account.id })
    activation = Activation.new(account: account, token:@token )
    Root.transaction do
      account.save!
      root.save!
      activation.save!
      serialized_data = AccountSerializer.new(account).serializable_hash[:data][:attributes]
      serialized_data[:message] = "Account created with success. An email has been sent to #{root_params[:email]} to activate your account."
      render json: serialized_data
      AccountMailer.with(account: account, url:request.host(), token:@token).welcome_email_root.deliver_later
    end
  end

  def index
    roots = Root.all.includes(:account)
    serialized_data = RootSerializer.new(roots).serializable_hash[:data]
    render json: serialized_data.map { |data| data[:attributes][:account] }
  end

  def update
    root = Root.joins(:account).find_by(accounts: { id:current_account.id})
    current_account.avatar.purge_later if root_params[:avatar]
    if current_account.update(root_params)
      render json: RootSerializer.new(root, messages: ["Profile was updated with success."])
    else
      render json: { errors: current_account.errors.full_messages }
    end
  end

  private

  def root_params
    params.require(:root).permit(:organization_id, :name, :email, :password, :avatar, :avatar_margin_left, :avatar_margin_top)
  end

  def set_token
    @token = SecureRandom.hex(64)
  end
end
