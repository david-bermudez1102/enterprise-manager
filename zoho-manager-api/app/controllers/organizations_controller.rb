class OrganizationsController < ApplicationController
  def create
    organization = Organization.new(organization_params)
    render json: OrganizationSerializer.new(organization) if organization.save
  end

  def index
    organizations = Organization.all
    render json: OrganizationSerializer.new(organizations)
  end

  private

  def organization_params
    params.require(:organization).permit(:name, :logo)
  end
end
