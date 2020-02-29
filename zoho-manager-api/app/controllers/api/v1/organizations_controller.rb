module Api::V1
  class OrganizationsController < ApplicationController
    def create
      organization = Organization.new(organization_params)
      if organization.save
        render json: OrganizationSerializer.new(organization)
      end
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
end
