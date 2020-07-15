class FieldsController < ApplicationController
  before_action :authenticate_user
  before_action :set_form, only: %i[create show update destroy]

  def create
    field = @form.fields.build(field_params)
    authorize @form
    Field.transaction do
      field.save!
      field.create_record_field!(field_params.except(:options_attributes,:hidden_in_form, :hidden_in_records, :allow_updates, :read_only, :min_length, :max_length, :field_dependents_attributes))
      serialized_field = FieldSerializer.new(field).serializable_hash[:data][:attributes]
      serialized_record_field = RecordFieldSerializer.new(field.record_field).serializable_hash[:data][:attributes]
      render json: {field:serialized_field, recordField:serialized_record_field, message: "Field was added successfully."}
    end
  end

  def index
    fields = current_account.organization.fields.includes({:record_key => :key_values}, :options, :record_field)
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
    Field.transaction do
      field = @form.fields.find(params[:id])
      field.update!(field_params)
      field.record_field.update!(field_params.except(:options_attributes, :hidden_in_form, :hidden_in_records, :allow_updates, :read_only, :min_length, :max_length, :field_dependents_attributes))
      serialized_field = FieldSerializer.new(field).serializable_hash[:data][:attributes]
      serialized_record_field = RecordFieldSerializer.new(field.record_field).serializable_hash[:data][:attributes]
      render json: {field:serialized_field, recordField:serialized_record_field, message: "Field was updated successfully."}
    end
  end

  def destroy
    field = @form.fields.find_by(id: params[:id])
    render json: { id: params[:id], message: 'Success' } if field.destroy
  end

  private

  def field_params
    params.require(:field).permit(:name, :field_type, :form_id, :is_required, :is_uniq, :hidden_in_form, :hidden_in_records, :allow_updates, :read_only, :min_length, :max_length, :default_value, :accepts_decimals, :field_format, :zoho_field_name, :combined_fields => [], :selectable_resource_attributes => [:form_id, :resource_field_id, :_destroy], :options_attributes => [:id, :field_id, :value, :_destroy], :record_key_attributes => [:resource_field_id], :field_dependents_attributes => [:id, :dependent_field_id, :operation, :content, :resource_field_id, :_destroy])
  end

  def set_form
    @form = Form.find(params[:form_id])
  end
end
