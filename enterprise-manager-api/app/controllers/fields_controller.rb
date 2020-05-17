class FieldsController < ApplicationController
  before_action :authenticate_user
  before_action :set_form

  def create
    field = @form.fields.build(field_params)
    if field.save
      serialized_field = FieldSerializer.new(field).serializable_hash[:data][:attributes]
      serialized_record_field = RecordFieldSerializer.new(field.record_field).serializable_hash[:data][:attributes]
      render json: {field:serialized_field, recordField:serialized_record_field, message: "Field was added successfully."}
    else
      field.destroy
      render json: { errors: field.errors.full_messages }
    end
  end

  def index
    fields = @form.fields.includes({:record_key => :key_values}, :options, :record_field)
    if stale?(fields, public: true)
      serialized_data = FieldSerializer.new(fields).serializable_hash
      render json: serialized_data[:data].map { |data| data[:attributes] }
    end
  end

  def show
    field = @form.fields.includes({:record_key => :key_values}, :options, :record_field).find_by(id: params[:id])
    serialized_data = FieldSerializer.new(field).serializable_hash[:data][:attributes]
    render json: serialized_data
  end

  def update
    field = @form.fields.find_by(id: params[:id])
    if field.update(field_params)
      serialized_data = FieldSerializer.new(field).serializable_hash[:data][:attributes]
      serialized_data[:messages] = ["Field updated with success."]
      render json: serialized_data
    else
      render json: { errors: field.errors.full_messages }
    end
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
      :is_required,
      :default_value,
      :accepts_decimals,
      :field_format,
      {:combined_fields => []},
      selectable_resource_attributes: [:form_id, :resource_field_id, :_destroy],
      options_attributes: [:value],
      record_key_attributes: [:resource_field_id]
    )
  end

  def set_form
    @form = Form.find(params[:form_id])
  end
end
