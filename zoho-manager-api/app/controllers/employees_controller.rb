class EmployeesController < ApplicationController

  before_action :set_admin

  def index
    employees = @admin.employees
    render json: EmployeeSerializer.new(employees)
  end

  def create
    employee = @admin.employees.new
    one_time_password = SecureRandom.hex
    account = employee.build_account(employee_params, password: one_time_password)
    render json: EmployeeSerializer.new(employee, one_time_password: one_time_password) if account.save
  end

  private
    def employee_params
      params.require(:employee).permit(:name, :email)
    end

    def set_admin
      @admin = Admin.find(params[:admin_id])
    end
end
