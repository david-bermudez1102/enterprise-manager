class ZohoBooks::ContactsController < ApplicationController
  require 'httparty'

  before_action :set_organization
  before_action :set_zoho_organization_id
  before_action :set_root_url
  before_action :set_authorization

  def index
    if params[:contact_name_contains]
      url = "#{@root_url}?contact_name_contains=#{params[:contact_name_contains]}&organization_id=#{@zoho_organization_id}"
    else
      url = "#{@root_url}/?organization_id=#{@zoho_organization_id}"
    end
    headers = {
      "Authorization" => @authorization
    }
    form =  Form.find_by(id:params[:form_id])
    response = HTTParty.get(url, headers: headers)
    response = JSON.parse(response&.body || "{}")
    response = response["contacts"].map do |contact|
     form.records.joins(:values => :record_field).where(values: { record_fields: {name: "Name"}, content:contact["contact_name"] }).map do |record|
        record.update(zoho_integration_record_attributes:{external_id:contact["contact_id"],connection:record.form.zoho_connection, record_id: record.id})
      end
    end
    render json:response
  end

  #Form.last.records.joins(:values => :record_field).where(values: { record_fields: {name: "Name"}, content:"County" })

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
            body["contact_name"] = value.content
          else
            body[field_name] = value.content
          end
        end
      end
      response = HTTParty.post(url, headers: headers, body:{JSONString: body.to_json})
      response = JSON.parse(response&.body || "{}")
      if response["code"] == 0
        record.update(zoho_integration_record_attributes:{external_id:response["contact"]["contact_id"],connection:record.form.zoho_connection, record_id: record.id})
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
    headers = {
      "Authorization" => @authorization
    }
    response = HTTParty.get(@root_url, headers: headers)
    render json: response
  end

  private
    def contacts_params
      params.require(:contact).permit(:contact, :form_id, :organization_id)
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

    def set_authorization
      @authorization = "Bearer #{@organization.zoho_integration.auth_token}"
    end
end
