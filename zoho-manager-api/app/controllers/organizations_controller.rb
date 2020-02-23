class OrganizationsController < ApplicationController
  def create
    organization = Organization.new(organization_params)
    if organization.save
      render json: organization
    end
  end

  private
  def organization_params
    params.require(:organizations).accept(:name,:logo)
  end
end
