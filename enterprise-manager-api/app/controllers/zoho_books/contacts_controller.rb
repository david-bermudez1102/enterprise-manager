class ZohoBooks::ContactsController < ApplicationController
  require 'httparty'
  
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_zoho_organization_id
  before_action :set_root_url
  before_action :set_token
  before_action :set_authorization

  def index
    
  end

  def sync
    form =  @organization.forms.find_by(id:params[:form_id])
    zoho_books = ZohoBooks::Contact.sync_from_zoho(form, @authorization, @root_url, @zoho_organization_id, params[:contact_name_contains], params[:merge_records], filterable_params, current_account, params[:contact][:body])
    render json: zoho_books
  end

  def create
    zoho_books = ZohoBooks::Contact.create_in_zoho(@authorization, @root_url, @zoho_organization_id, params[:contact][:body])
    render json: zoho_books
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
  end

  def update_all
    zoho_books = ZohoBooks::Contact.update_in_zoho(@authorization, @root_url, @zoho_organization_id, params[:contact][:body])
    render json: zoho_books
  end

  private
    def contacts_params
      params.require(:contact).permit(:record_id, :zoho_record_id, :form_id, :organization_id, :body)
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_zoho_organization_id
       @zoho_organization_id = @organization.zoho_integration.external_organization_id
    end

    def set_root_url
       @root_url = "https://books.zoho.com/api/v3/contacts"
    end

    def set_token
      url = "https://accounts.zoho.com/oauth/v2/token"
      body = {
        refresh_token: @organization.zoho_integration.refresh_token,
        client_id: @organization.zoho_integration.client_id,
        client_secret: @organization.zoho_integration.client_secret,
        redirect_uri: @organization.zoho_integration.redirect_uri,
        grant_type: "refresh_token"
      } 
      headers = {
      "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
      }
      response = HTTParty.post(url, body:body, headers: headers)
      response = JSON.parse(response&.body || "{}")
      @token = response["access_token"]
      @organization.zoho_integration.auth_token = @token
      @organization.save
    end

    def set_authorization
      @authorization = "Bearer #{@token}"
    end

    def filterable_params
      params.slice(:month_year, :from_date, :date_range, :current_month, :date, :query, :column_id)
    end
end
