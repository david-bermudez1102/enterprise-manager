class OrganizationsController < ApplicationController
  def create
    organization = Organization.new(organization_params)
    render json: OrganizationSerializer.new(organization) if organization.save
  end

  def update
    organization = Organization.find_by(id: params[:id])
    if organization.update(organization_params)
      render json: OrganizationSerializer.new(organization, {params: {messages:["Update with success"]}}).serialized_json
    else
      render json: { errors: organization.errors.full_messages}
    end
  end

  def index
    organizations = Organization.all
    if stale?(organizations)
      render json: OrganizationSerializer.new(organizations)
    end
  end

  private

  def organization_params
    params.require(:organization).permit(:name, :logo, :logo_margin_left, :logo_margin_top, :logo_width_ratio, zoho_integration_attributes: [:auth_token, :refresh_token, :account_id, :organization_id, :external_organization_id, :client_id, :client_secret, :redirect_uri], quickbooks_integration_attributes: [:auth_token])
  end
end
