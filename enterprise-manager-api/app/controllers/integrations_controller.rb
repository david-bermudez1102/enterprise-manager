class IntegrationsController < ApplicationController
 def create
    integration = Integration.new(integration_params)
    render json: IntegrationSerializer.new(integration) if integration.save
  end

  def index
    integrations = Integration.all
    render json: IntegrationSerializer.new(integrations)
  end

  private

  def integration_params
    params.require(:integration).permit(:auth_token)
  end

  def set_organization
   @organization = current_account.organizations.find_by(organization_id:params[:organization_id])
  end
end
