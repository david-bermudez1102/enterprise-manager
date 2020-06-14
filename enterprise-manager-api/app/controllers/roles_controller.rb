class RolesController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization

  def create
    role = @organization.roles.build(name:params[:role][:name])
    
    if role.save
      assignments_attributes = role_params[:default_permission_attributes][:permission_attributes][:assignments_attributes].map do |assignment| 
        assignment.merge(role_id:role.id)
      end
      role.update(default_permission_attributes:{permission_attributes:{assignments_attributes:assignments_attributes}})

      serialized_data = RoleSerializer.new(role).serializable_hash[:data][:attributes]
      serialized_data[:message] = "Role was added with success"
      render json: serialized_data
    else
      render json: {errors: role.errors.full_messages}
    end
  end

  def update
    role = @organization.roles.find_by(id: params[:id])
    if role.update(role_params)
      serialized_data = RoleSerializer.new(role).serializable_hash[:data][:attributes]
      serialized_data[:message] = "Role was updated with success"
      render json: serialized_data
    else
      render json: {errors: role.errors.full_messages}
    end
  end

  def index
    roles = @organization.roles.includes({ :default_permission => [ {:permission => [:assignments, :exclusions]}] })
    if roles
      serialized_data = RoleSerializer.new(roles).serializable_hash[:data]
      render json: serialized_data.map { |data| data[:attributes] }
    else
      render json: {errors: roles.errors.full_messages}
    end
  end


  private

  def role_params
    params.require(:role).permit(:name, default_permission_attributes:[permission_attributes:[assignments_attributes:[:id, :role_id, :create_privilege, :update_privilege, :delete_privilege, :insert_privilege, :read_privilege]]])
  end

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end
end
