class ZohoBooks::InvoicesController < ApplicationController
   require 'httparty'

  before_action :set_organization
  before_action :set_zoho_organization_id, except: %i[index]
  before_action :set_root_url
  before_action :set_token, except: %i[index]
  before_action :set_authorization, except: %i[index]

  def index
    # if params[:invoice_name_contains]
    #   url = "#{@root_url}?invoice_name_contains=#{params[:invoice_name_contains]}&organization_id=#{@zoho_organization_id}"
    # else
    #   url = "#{@root_url}/?organization_id=#{@zoho_organization_id}"
    # end
    # headers = {
    #   "Authorization" => @authorization
    # }
    # form =  @organization.forms.find_by(id:params[:form_id])
    # response = HTTParty.get(url, headers: headers)
    # response = JSON.parse(response&.body || "{}")
    # response = response["invoices"].map do |invoice|
    #  form.records.joins(:values => :record_field).where(values: { record_fields: {name: "Name"}, content:invoice["invoice_name"] }).map do |record|
    #     record.update(zoho_integration_record_attributes:{external_id:invoice["invoice_id"],connection:record.form.zoho_connection, record_id: record.id})
    #   end
    # end
    # render json:response
    #.joins(:record).where(records: {form_id: params[:form_id]})
    values = Value.joins(:key_value).group("key_values.value").joins(:record).where(records:{form_id:params[:form_id]}).map do |value|
      key_value = value.key_value
      integration = key_value.record_value.record.zoho_integration_record
      connection = integration.connection
      connection_type = "#{connection.connection_type.singularize}_id"
      body = {}
      body[connection_type] = integration.external_id
      body[key_value.record_key.field.name] = key_value.value
      body["line_items"] = Record.joins(:values).where(values:{content:key_value.value}, form_id:params[:form_id]).map do |record|
        items_body = {}
        values = record.values.select do |value| 
          record_value = value.record_value 
          integration_record = record_value ? record_value.record.zoho_integration_record : nil
          connection_type = integration_record ? integration_record.connection.connection_type : nil
          record_value && integration_record && connection_type=="items"
        end

        values.map do |value|
          integration_record = value.record_value.record.zoho_integration_record
          items_body["item_id"] = integration_record.external_id
          value.record.values.map do |value|
            if value.record_value
              if !value.record_value.record.zoho_integration_record
                items_body[value.record_field.name] = value.content
              end
            elsif !value.key_value
              items_body[value.record_field.name] = value.content
            end
          end     
        end.compact
        items_body
      end.delete_if &:empty?
      body
    end

    # x = values.map do |value|
    #   body = {}
    #   Record.joins(:values).where(values:{content:value.value}).map do |record|
    #     body[record.id] = record.values
    #   end
    #   body
    # end
    render json: values
  end

  def create
    headers = {
      "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
      "Authorization" => @authorization
    }
    url = "#{@root_url}?organization_id=#{@zoho_organization_id}&ignore_auto_number_generation=true"
    records = ZohoBooks::Invoice.create_records(url, headers, params[:form_id])
    if records
      render json: records
    else
      render json: {errors: records.errors.full_messages}
    end
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
    record = form.records.find_by(id: invoices_params[:record_id])
    url = "#{@root_url}/#{invoices_params[:zoho_record_id]}?organization_id=#{@zoho_organization_id}"
    headers = {
      "Authorization" => @authorization
    }
    body = {}
    record.values.map do |value|
      if value.record_field
        field_name = value.record_field.name.downcase
        if field_name == "name"
          body["invoice_name"] = value.content
        else
          body[field_name] = value.content
        end
      end
    end
    response = HTTParty.put(url, headers: headers, body:{JSONString: body.to_json})
    response = JSON.parse(response&.body || "{}")
    if response["code"] == 0
      record.update(zoho_integration_record_attributes:{external_id:response["invoice"]["invoice_id"],connection:record.form.zoho_connection, record_id: record.id})
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
          invoice_id = record.zoho_integration_record.external_id
          url = "#{@root_url}/#{invoice_id}?organization_id=#{@zoho_organization_id}"
          body = {}
          record.values.map do |value|
            if value.record_field
              field_name = value.record_field.name.downcase
              if field_name == "name"
                body["invoice_name"] = value.content
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
    def invoices_params
      params.require(:invoice).permit(:record_id, :zoho_record_id, :form_id, :organization_id)
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_zoho_organization_id
       @zoho_organization_id = @organization.zoho_integration.external_organization_id
    end

    def set_root_url
       @root_url = "https://books.zoho.com/api/v3/invoices"
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
