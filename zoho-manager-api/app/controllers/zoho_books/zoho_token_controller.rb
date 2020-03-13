class ZohoBooks::ZohoTokenController < ApplicationController
  require 'httparty'

  before_action :set_organization
  before_action :set_integration
  before_action :set_root_url
  before_action :set_body
  
  def create
    headers = {
      "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
    }
    token = HTTParty.post(@root_url, body:@body, headers: headers)
    render json: token
  end


  private

    def zoho_books_params
      params.require(:zoho_books).permit(:code, :organization_id)
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_integration
      @integration = @organization.zoho_integration
    end

    def set_root_url
       @root_url = "https://accounts.zoho.com/oauth/v2/token?"
    end

    def set_body
      @body = {
        code: zoho_books_params[:code],
        client_id: @integration.client_id,
        client_secret: @integration.client_secret,
        redirect_uri: @integration.redirect_uri,
        grant_type: "authorization_code"
      } 
    end

end
