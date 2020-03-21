class ValuesController < ApplicationController
  before_action :set_organization
  before_action :set_form

  def index
    values = @form.values.includes(:record,:record_field,:record,:form)
    render json: ValueSerializer.new(values)
  end

  def show
    record = @form.values.includes(:record,:record_field,:record,:form).find_by(id: params[:id])
    render json: ValueSerializer.new(record)
  end

  private

  def value_params
    params.require(:value).permit(:organization_id, :form_id)
  end

  def set_organization
    @organization = Organization.find_by(id: params[:organization_id])
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end
end
