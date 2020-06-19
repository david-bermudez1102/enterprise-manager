class AccountsController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_root
  before_action :set_account, only: %i[show update destroy]
  before_action :set_token

  def create
    one_time_password = SecureRandom.hex 
    account = @root.accounts.build(account_params.merge(password:one_time_password))
    activation = Activation.new(account: account,token:@token )
    Account.transaction do
      account.save!
      account.save!
      activation.save!
      serialized_data = AccountSerializer.new(account).serializable_hash[:data][:attributes] 
      render json: serialized_data
      AccountMailer.with(account: account, one_time_password: one_time_password, url:request.host(), token:@token).welcome_email.deliver_later
    end
  end

  def show
    accounts = @organization.accounts.find_by(id:params[:id])
    serialized_data = AccountSerializer.new(accounts).serializable_hash[:data]
    render json: serialized_data
  end

  def index
    accounts = @organization.accounts.where.not(id:current_account.id)
    authorize accounts
    serialized_data = AccountSerializer.new(accounts).serializable_hash[:data]
    render json: serialized_data.map { |data| data[:attributes] }
  end

  def update
    Account.transaction do
      @account
      @account.update!(account_params)
      serialized_data = AccountSerializer.new(@account).serializable_hash[:data][:attributes]
      render json: serialized_data
    end
  end

  def destroy
    if @account && @account.destroy
      render json:{messages:["Account deleted with success."]}
    elsif @manager && @manager.destroy
      render json:{messages:["Account deleted with success."]}
    else
      render json:{errors:["Unable to delete this account."]}
    end
  end

  private
    def account_params
      params.require(:account).permit(:organization_id, :name, :email, :password, :avatar, :avatar_margin_left, :avatar_margin_top, :role_ids => [])
    end

    def set_organization
      @organization = Organization.all.size > 1 ? current_account.organization : Organization.find_by(id:params[:organization_id])
    end

    def set_root
      @root = current_account.is_root ? Root.joins(:account).find_by!(accounts:{id:current_account.id, organization_id:@organization.id}) : nil
    end

    def set_account
      @account = @root ? @root.accounts.find_by!(account_id:params[:account_id]) : current_account
    end

    def set_token
      @token = SecureRandom.hex(64)
    end
end
