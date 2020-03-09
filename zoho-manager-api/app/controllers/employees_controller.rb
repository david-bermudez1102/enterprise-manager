class EmployeesController < ApplicationController

  before_action :set_admin

  def index
    employees = @admin.employees
    render json: EmployeeSerializer.new(employees)
  end

  private
    def set_admin
      @admin = Admin.find(params[:admin_id])
    end
end
