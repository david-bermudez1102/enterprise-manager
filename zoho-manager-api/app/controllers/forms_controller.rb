class FormsController < ApplicationController
  before_action :set_organization

  def create
    form = @organization.forms.build(form_params)
    render json: FormSerializer.new(form) if form.save
  end

  def index
    forms = @organization.forms
    render json: FormSerializer.new(forms)
  end

  def show
    form = @organization.forms.find_by(id: params[:id])
    render json: FormSerializer.new(form)
  end

  def destroy
    form = @organization.forms.find_by(id: params[:id])
    render json: { id: params[:id], message: 'Success' } if form.destroy
  end

  private

  def form_params
    params.require(:form).permit(:name, :organization_id)
  end

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end
end
