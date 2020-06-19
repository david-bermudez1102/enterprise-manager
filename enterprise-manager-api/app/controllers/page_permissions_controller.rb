class PagePermissionsController < ApplicationController
  before_action :set_organization
  before_action :set_page_permission, only: [:show, :update, :destroy]

  # GET /page_permissions
  def index
    @page_permissions = @organization.page_permissions
    serialized_data = PagePermissionSerializer.new(@page_permissions).serializable_hash[:data]
    render json: serialized_data.map{ |data| data[:attributes] }
  end

  # GET /page_permissions/1
  def show
    render json: @page_permission
  end

  # POST /page_permissions
  def create
    @page_permission = @organization.page_permissions.new(page_permission_params)
    @page_permission.save!
    serialized_data = PagePermissionSerializer.new(@page_permission).serializable_hash[:data][:attributes]
    render json: serialized_data
  end

  # PATCH/PUT /page_permissions/1
  def update
    @page_permission.update!(page_permission_params)
    serialized_data = PagePermissionSerializer.new(@page_permission).serializable_hash[:data][:attributes]
    render json: serialized_data
  end

  # DELETE /page_permissions/1
  def destroy
    @page_permission.destroy
  end

  private
    def page_permission_params
      params.require(:page_permission).permit(:id, :page_name, permission_attributes:[assignments_attributes:[:id, :role_id, :create_privilege, :update_privilege, :delete_privilege, :insert_privilege, :read_privilege], exclusions_attributes:[:id, :_destroy, :permission_id, :account_id, :exclusion_type]])
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_page_permission
      @page_permission = @organization.page_permissions.find(params[:id])
    end
end
