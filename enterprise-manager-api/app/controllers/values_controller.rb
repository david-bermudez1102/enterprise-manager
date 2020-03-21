class ValuesController < ApplicationController
  before_action :set_organization
  before_action :set_form
  before_action :set_value, only: %i[show, update]

  def index
    values = @form.values.includes(:record,:record_field,:record,:form)
    render json: ValueSerializer.new(values)
  end

  def show
    render json: ValueSerializer.new(@value)
  end

  def update
    if @value.update(value_params)
      render json: ValueSerializer.new(@value)
    else
      render json: { errors: @value.errors.full_messages }
    end
  end

  private

  def value_params
    params.require(:value).permit(:content)
  end

  def set_organization
    @organization = current_account.organization
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end

  def set_value
    @value = @form.values.find_by(id: params[:id])
  end
end
