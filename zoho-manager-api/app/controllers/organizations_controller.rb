class OrganizationsController < ApplicationController
  def create
    organization = Organization.new(organization_params)
    if organization.save
      render json: organization
    end
  end

  def index
    organizations = Organization.all
    render json: organizations
  end

  private
  def organization_params
    params.require(:organization).permit(:name,:logo)
  end
end
