class KeyValuesController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_form

  def index
    key_values = KeyValue.all
    render json: KeyValueSerializer.new(key_values)
  end



  private

  def set_organization
    @organization = Organization.find_by(id: params[:organization_id])
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end
end
