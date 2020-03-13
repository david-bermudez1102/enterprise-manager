class ZohoBooks::ItemsController < ApplicationController
  require 'httparty'

  before_action :set_organization
  before_action :set_zoho_organization_id
  before_action :set_root_url
  before_action :set_authorization

  def index
    url = "#{@root_url}/?organization_id=#{@zoho_organization_id}"
    headers = {
      "Authorization" => @authorization
    }
    response = HTTParty.get(url, headers: headers)
    render json: response
  end

  def create
    headers = {
      "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
      "Authorization" => @authorization
    }
    response = HTTParty.get(@root_url, headers: headers)
    render json: response
  end

  def show
    headers = {
      "Authorization" => @authorization
    }
    response = HTTParty.get(@root_url, headers: headers)
    render json: response
  end

  def destroy
    headers = {
      "Authorization" => @authorization
    }
    response = HTTParty.get(@root_url, headers: headers)
    render json: response
  end

  def update
    headers = {
      "Authorization" => @authorization
    }
    response = HTTParty.get(@root_url, headers: headers)
    render json: response
  end

  private
    def zoho_books_params
      params.require(:manager).permit(:name, :email)
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_zoho_organization_id
       @zoho_organization_id = @organization.zoho_integration.external_organization_id
    end

    def set_root_url
       @root_url = "https://books.zoho.com/api/v3/items"
    end

    def set_authorization
      @authorization = "Bearer #{@organization.zoho_integration.auth_token}"
    end
end
