class RecordsController < ApplicationController
  before_action :set_organization
  before_action :set_form

  def create
    record = @form.records.build(record_params)
    if record.save
      render json: RecordSerializer.new(record).serialized_json
    else
      render json: record.errors.full_messages
    end
  end

  def index
    record = @form.records
    render json: RecordSerializer.new(record).serialized_json
  end

  def show
    record = @form.records.find_by(id: params[:id])
    render json: RecordSerializer.new(record)
  end

  private

  def record_params
    params.require(:record).permit(
      values_attributes: %i[record_field_id content],
    )
  end

  def set_organization
    @organization = Organization.find_by(id: params[:organization_id])
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end
end
