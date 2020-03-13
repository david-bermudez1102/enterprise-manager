class IntegrationRecordsController < ApplicationController
  before_action :set_integration_record, only: [:show, :update, :destroy]

  # GET /integration_records
  def index
    @integration_records = IntegrationRecord.all

    render json: @integration_records
  end

  # GET /integration_records/1
  def show
    render json: @integration_record
  end

  # POST /integration_records
  def create
    @integration_record = IntegrationRecord.new(integration_record_params)

    if @integration_record.save
      render json: @integration_record, status: :created, location: @integration_record
    else
      render json: @integration_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /integration_records/1
  def update
    if @integration_record.update(integration_record_params)
      render json: @integration_record
    else
      render json: @integration_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /integration_records/1
  def destroy
    @integration_record.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_integration_record
      @integration_record = IntegrationRecord.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def integration_record_params
      params.require(:integration_record).permit(:connection_id, :external_id, :record_id)
    end
end
