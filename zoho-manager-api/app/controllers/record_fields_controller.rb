class RecordFieldsController < ApplicationController
  before_action :set_form
  def create
    record_field = @form.record_fields.build(record_field_params)
    if record_field.save
      render json: RecordFieldSerializer.new(record_field)
    else
      render json: { errors: record_field.errors.full_messages }
    end
  end

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
      :field_id,
      :name,
      :field_type,
      :form_id,
      selectable_resource_attributes: [:form_id, :resource_field_id],
      options_attributes: [:value]
    )
  end

  def set_form
    @form = Form.find(params[:form_id])
  end
end
