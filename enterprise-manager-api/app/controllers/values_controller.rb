class ValuesController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_form
  before_action :set_record_field, only: :create
  before_action :set_record, only: :create
  before_action :set_value, only: %i[show, update]

  def index
    values = @form.values.includes(:record,:record_field,:record,:form)
    render json: ValueSerializer.new(values).serializable_hash[:data].map { |data| data[:attributes]}
  end

  def show
    render json: ValueSerializer.new(@value)
  end

  def create
    value = @record.values.build(value_params)
    if !@record_field.nil? && value.save
      serialized_data = ValueSerializer.new(value).serializable_hash[:data][:attributes]
      render json: serialized_data
    else
      render json: { errors: value.errors.full_messages }
    end
  end

  def update
    if @value.update(value_params)
      serialized_data = ValueSerializer.new(@value).serializable_hash[:data]
      serialized_data[:attributes]
      render json: serialized_data[:attributes]
    else
      render json: { errors: @value.errors.full_messages }
    end
  end

  private

  def value_params
    params.require(:value).permit(:content, :record_id, :record_field_id, :option_id, :record_value_id, checkbox_options_attributes:[:option_id])
  end

  def set_organization
    @organization = current_account.organization
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end

  def set_record_field
    @record_field = @form.record_fields.find_by(id: value_params[:record_field_id])
  end

  def set_record
    @record = @form.records.find_by(id: value_params[:record_id])
  end

  def set_value
    @value = @form.values.find_by(id: params[:id])
  end
end
