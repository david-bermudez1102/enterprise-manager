class RecordsController < ApplicationController
  before_action :set_organization
  before_action :set_form
  before_action :set_limit, only: %i[index]
  before_action :set_offset, only: %i[index]
  
  def create
    record = @form.records.build(record_params)
    if record.save
      render json: RecordSerializer.new(record)
    else
      render json: {errors: record.errors.full_messages}
    end
  end

  def index
    records = @form.records.includes({:values => [:form, :record_value]}, :zoho_integration_record, :quickbooks_integration_record)
    if stale?(records,public:true)
      render json: RecordSerializer.new(records)
    end
  end

  def show
    record = @form.records.find_by(id: params[:id]).includes({:values => [:form, :record_value]}, :zoho_integration_record, :quickbooks_integration_record)
    if stale?(record,public:true)
      render json: RecordSerializer.new(record)
    end
  end

  private

  def record_params
    params.require(:record).permit(
      values_attributes: [:record_field_id, :content, :option_id, :record_value_id, checkbox_options_attributes:[:option_id]],
    )
  end

  def set_organization
    @organization = Organization.find_by(id: params[:organization_id])
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end

  def set_limit
    if !params[:limit] || params[:limit]< 0
      @limit = 25
    else
      @limit = params[:limit]
    end
  end

  def set_offset
    if !params[:page] || params[:page] < 0
      @offset = 0
    else
      @offset = @limit*params[:page]
    end
  end
end
