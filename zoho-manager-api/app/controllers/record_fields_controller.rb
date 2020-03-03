class RecordFieldsController < ApplicationController
  before_action :set_form

  def index
    record_fields = @form.record_fields
    render json: RecordFieldSerializer.new(record_fields)
  end

  def update
    record_field = @form.record_fields.find_by(id: params[:id])
    render json: RecordFieldSerializer.new(record_field) if record_field.update(record_field_params)
  end

  def destroy
    record_field = @form.record_fields.find_by(id: params[:id])
    render json: { id: params[:id], message: 'Success' } if record_field.destroy
  end


  private
  def record_field_params
    params.require(:record_field).permit(
      :name,
      :form_id
    )
  end

  def set_form
    @form = Form.find(params[:form_id])
  end
end
