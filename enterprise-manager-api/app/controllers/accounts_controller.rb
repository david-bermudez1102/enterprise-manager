class AccountsController < ApplicationController
  before_action :set_organization
  before_action :set_admin
  before_action :set_employee
  before_action :set_manager

  def update
    if @employee && @employee.account.update(account_params)
      render json:EmployeeSerializer.new(@employee)
    elsif @manager && @manager.account.update(account_params)
      render json:ManagerSerializer.new(@manager)
    else
      render json:{errors:["Unable to update this account."]}
    end
  end

  def destroy
    if @employee && @employee.destroy
      render json:{messages:["Account deleted with success."]}
    elsif @manager && @manager.destroy
      render json:{messages:["Account deleted with success."]}
    else
      render json:{errors:["Unable to delete this account."]}
    end
  end

  private
    def account_params
      params.require(:account).permit(:name, :email)
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
