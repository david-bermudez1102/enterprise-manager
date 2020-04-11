class AccountUnlockController < ApplicationController
  before_action :set_organization
  before_action :set_admin
  before_action :set_employee
  before_action :set_manager

  def create
    recovery_token = SecureRandom.hex(64)
    if @employee && @employee.account.update(recovery_token:recovery_token)
      render json:{messages:["Recovery token was sent ."]}
    elsif @manager && @manager.account.update(recovery_token:recovery_token)
      render json:{messages:["Account deleted with success."]}
    else
      render json:{errors:["Unable to update this account."]}
    end
  end

  private
    def account_params
      params.require(:account).permit(:name, :email, :disabled)
    end

    def set_organization
      @organization = current_account.organization
    end

    def set_admin
      @admin = Admin.joins(:account).find_by(accounts:{id:current_account.id, organization_id:@organization.id}) 
    end

    def set_employee
      @employee = Employee.joins(:account).find_by(accounts:{id:params[:id]},admin_id:@admin.id)
    end

     def set_manager
      @manager = Manager.joins(:account).find_by(accounts:{id:params[:id]},admin_id:@admin.id)
    end
end
