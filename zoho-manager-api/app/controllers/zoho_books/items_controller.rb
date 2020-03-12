class ZohoBooks::ItemsController < ApplicationController
  require 'httparty'

 before_action :set_organization
 before_action :set_root_url
 before_action :set_urls

  def index
    headers = {
    "Authorization" => "Bearer #{@organization.zoho_integration.auth_token}"
    }
    response = HTTParty.get(@urls[:items], headers: headers)
    render json: response
  end

  private
    def zoho_books_params
      params.require(:manager).permit(:name, :email)
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_root_url
      @root_url = "https://books.zoho.com/api/v3"
    end

    def set_urls
      @urls = { items: "#{@root_url}/items?organization_id=#{@organization.zoho_integration.external_organization_id}" }
    end
end
