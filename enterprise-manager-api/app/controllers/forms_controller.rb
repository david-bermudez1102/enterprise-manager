class FormsController < ApplicationController
  before_action :set_organization

  def create
    form = @organization.forms.build(form_params)
    if form.save
      render json: FormSerializer.new(form, messages:["Resource was created successfully."])
    else
      render json: { errors: form.errors.full_messages}
    end
  end

  def index
    forms = @organization.forms.includes(:zoho_connection, :quickbooks_connection)
    render json: FormSerializer.new(forms)
  end

  def show
    form = @organization.forms.includes(:zoho_connection, :quickbooks_connection).find_by(id: params[:id])
    render json: FormSerializer.new(form)
  end

  def update
    form = @organization.forms.find_by(id: params[:id])
    if form.update(form_params)
      render json: FormSerializer.new(form, messages: ["Changes were successfully saved"])
    else
      render json: { errors: form.errors.full_messages }
    end
  end

  def destroy
    form = @organization.forms.find_by(id: params[:id])
    render json: { id: params[:id], message: 'Success' } if form.destroy
  end

  private

  def form_params
    params.require(:form).permit(:name, :organization_id, zoho_connection_attributes:[:id, :name, :integration_id, :connection_type, :form_id], quickbooks_connection_attributes:[:id, :name, :integration_id, :connection_type, :form_id])
  end

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end
end
