class EmployeesController < ApplicationController

  before_action :set_admin

  def index
    employees = @admin.employees
    render json: EmployeeSerializer.new(employees)
  end

  def create
    employee = @admin.employees.new
    one_time_password = SecureRandom.hex
    account = employee.build_account(name: employee_params[:name], email:employee_params[:email], password: one_time_password)
    if account.save && employee.save
      render json: EmployeeSerializer.new(employee, one_time_password: one_time_password, messages: ["Employee was added with success."])
    else
      render json: { errors: account.errors.full_messages }
    end
  end

  private
    def employee_params
      params.require(:employee).permit(:name, :email)
    end

    def set_admin
      @admin = Admin.joins(:account).find_by(accounts:{id:params[:admin_id]}) 
    end
end
