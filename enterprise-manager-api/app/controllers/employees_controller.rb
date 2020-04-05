class EmployeesController < ApplicationController

  before_action :set_organization
  before_action :set_admin
  before_action :set_token, only: %i[create]

  def index
    employees = @admin.employees
    render json: EmployeeSerializer.new(employees)
  end

  def create
    employee = @admin.employees.new
    one_time_password = SecureRandom.hex
    account = employee.build_account(organization_id:@organization.id, name: employee_params[:name], email:employee_params[:email], password: one_time_password)
    activation = Activation.new(account: account, token:@token )
    if account.save && employee.save && activation.save
      render json: EmployeeSerializer.new(employee, messages: ["Employee was added with success."])
      AccountMailer.with(account: account, one_time_password: one_time_password, url:request.host(), token:@token).welcome_email.deliver_later
    else
      render json: { errors: account.errors.full_messages }
    end
  end

  private
    def employee_params
      params.require(:employee).permit(:name, :email)
    end

    def set_organization
      @organization = current_account.organization
    end

    def set_admin
      @admin = Admin.joins(:account).find_by(accounts:{id:current_account.id}) 
    end

    def set_token
      @token = SecureRandom.hex(32) + SecureRandom.base64(12)
    end
    
end
