class OrganizationsController < ApplicationController
  def create
    organization = Organization.new(organization_params)
    render json: OrganizationSerializer.new(organization) if organization.save
  end

  def update
    organization = Organization.find_by(id: params[:id])
    if organization.update(organization_params)
      render json: OrganizationSerializer.new(organization)
    else
      render json: { messages: organization.errors.full_messages}
    end
  end

  def index
    organizations = Organization.all
    render json: OrganizationSerializer.new(organizations)
  end

  private

  def organization_params
    params.require(:organization).permit(:name, :logo, zoho_integration_attributes: [:auth_token, :account_id, :organization_id, :external_organization_id], quickbooks_integration_attributes: [:auth_token])
  end
end
