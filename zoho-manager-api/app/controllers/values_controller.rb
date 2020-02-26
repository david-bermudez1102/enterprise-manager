class ValuesController < ApplicationController
  before_action :set_organization
  before_action :set_form

  def index
    values = @form.values
    render json: ValueSerializer.new(values)
  end

  def show
    record = @form.records.find_by(id: params[:id])
    render json: RecordSerializer.new(record)
  end

  private
    def record_params
      params.require(:record).permit(values_attributes:[:field_id,:content])
    end

    def set_organization
      @organization = Organization.find_by(id: params[:organization_id])
    end

    def set_form
      @form = @organization.forms.find_by(id: params[:form_id])
    end
    
end
