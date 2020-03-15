class ZohoBooks::ItemsController < ApplicationController
require 'httparty'

  before_action :set_organization
  before_action :set_zoho_organization_id
  before_action :set_root_url
  before_action :set_token
  before_action :set_authorization

  def index
    if params[:item_name_contains]
      url = "#{@root_url}?item_name_contains=#{params[:item_name_contains]}&organization_id=#{@zoho_organization_id}"
    else
      url = "#{@root_url}/?organization_id=#{@zoho_organization_id}"
    end
    headers = {
      "Authorization" => @authorization
    }
    form =  @organization.forms.find_by(id:params[:form_id])
    response = HTTParty.get(url, headers: headers)
    response = JSON.parse(response&.body || "{}")
    response = response["items"].map do |item|
     form.records.joins(:values => :record_field).where(values: { record_fields: {name: "Name"}, content:item["item_name"] }).map do |record|
        record.update(zoho_integration_record_attributes:{external_id:item["item_id"],connection:record.form.zoho_connection, record_id: record.id})
      end
    end
    render json:response
  end

  def create
    headers = {
      "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
      "Authorization" => @authorization
    }
    url = "#{@root_url}?organization_id=#{@zoho_organization_id}"
    records = Record.where("form_id = ? and id NOT IN (SELECT record_id FROM integration_records)", params[:form_id])
    records = records.map do |record|
      body = {}
      record.values.map do |value|
        if value.record_field
          field_name = value.record_field.name.downcase
          if field_name == "name"
            body["name"] = value.content
          else
            body[field_name] = value.content
          end
        end
      end
      response = HTTParty.post(url, headers: headers, body:{JSONString: body.to_json})
      response = JSON.parse(response&.body || "{}")
      if response["code"] == 0
        record.update(zoho_integration_record_attributes:{external_id:response["item"]["item_id"],connection:record.form.zoho_connection, record_id: record.id})
        RecordSerializer.new(record)
      end
    end
    render json: records.compact
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
    form =  @organization.forms.find_by(id:params[:form_id])
    record = form.records.find_by(id: items_params[:record_id])
    url = "#{@root_url}/#{items_params[:zoho_record_id]}?organization_id=#{@zoho_organization_id}"
    headers = {
      "Authorization" => @authorization
    }
    body = {}
    record.values.map do |value|
      if value.record_field
        field_name = value.record_field.name.downcase
        if field_name == "name"
          body["item_name"] = value.content
        else
          body[field_name] = value.content
        end
      end
    end
    response = HTTParty.put(url, headers: headers, body:{JSONString: body.to_json})
    response = JSON.parse(response&.body || "{}")
    if response["code"] == 0
      record.update(zoho_integration_record_attributes:{external_id:response["item"]["item_id"],connection:record.form.zoho_connection, record_id: record.id})
      RecordSerializer.new(record)
    end
    render json: response
  end

  def update_all
    headers = {
      "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
      "Authorization" => @authorization
    }
    records = Record.where("form_id = ? and id IN (SELECT record_id FROM integration_records)", params[:form_id])
    records = records.map do |record|
      if record.zoho_integration_record
          item_id = record.zoho_integration_record.external_id
          url = "#{@root_url}/#{item_id}?organization_id=#{@zoho_organization_id}"
          body = {}
          record.values.map do |value|
            if value.record_field
              field_name = value.record_field.name.downcase
              if field_name == "name"
                body["item_name"] = value.content
              else
                body[field_name] = value.content
              end
            end
          end
          response = HTTParty.put(url, headers: headers, body:{JSONString: body.to_json})
          response = JSON.parse(response&.body || "{}")
          response
      end
    end
    render json: records
  end

  private
    def items_params
      params.require(:item).permit(:record_id, :zoho_record_id, :form_id, :organization_id)
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
end
