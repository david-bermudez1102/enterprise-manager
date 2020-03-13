class ConnectionsController < ApplicationController
  before_action :set_connection, only: [:show, :update, :destroy]
  before_action :set_organization
  before_action :set_form

  def index
    @connections = @form.connections

    render json: @connections
  end

  def show
    render json: @connection
  end

  def create
    @connection = Connection.new(connection_params)

    if @connection.save
      render json: @connection, status: :created, location: @connection
    else
      render json: @connection.errors, status: :unprocessable_entity
    end
  end

  def update
    if @connection.update(connection_params)
      render json: @connection
    else
      render json: @connection.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @connection.destroy
  end

  private
    def set_organization
      @organization = Organization.find(params[:organization_id])
    end

    def set_form
      @form = @organization.forms.find(params[:form_id])
    end

    def set_connection
      @connection = @form.find(params[:id])
    end

    def connection_params
      params.require(:connection).permit(:integration_id, :form_id, :type)
    end
end
