class FieldsController < ApplicationController
  before_action :set_form

  def create
    field = @form.fields.build(field_params)
    if field.save
      render(json: FieldSerializer.new(field))
    else
      render json: { errors: field.errors.full_messages }
    end
  end

  def index
    fields = @form.fields
    render json: FieldSerializer.new(fields)
  end

  def show
    field = @form.fields.find_by(id: params[:id])
    render json: FieldSerializer.new(field)
  end

  def update
    field = @form.fields.find_by(id: params[:id])
    render json: FieldSerializer.new(field) if field.update(field_params)
  end

  def destroy
    field = @form.fields.find_by(id: params[:id])
    render json: { id: params[:id], message: 'Success' } if field.destroy
  end

  private

  def field_params
    params.require(:field).permit(
      :name,
      :field_type,
      :form_id,
      selectable_resource_attributes: [:form_id, :resource_field_id, :_destroy],
      options_attributes: [:value],
      record_key_attributes: [:resource_field_id]
    )
  end

  def set_form
    @form = Form.find(params[:form_id])
  end
end