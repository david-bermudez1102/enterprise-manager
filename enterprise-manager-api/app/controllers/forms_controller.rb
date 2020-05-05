class FormsController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization

  def create
    form = @organization.forms.build(form_params)
    if form.save
      serialized_data = FormSerializer.new(form).serializable_hash
      render json: serialized_data[:data][:attributes]
    else
      render json: { errors: form.errors.full_messages}
    end
  end

  def index
    forms = @organization.forms.includes({zoho_connection: :integration}, {quickbooks_connection: :integration})
    if stale?(forms, public:true)
      serialized_data = FormSerializer.new(forms).serializable_hash
      render json: serialized_data[:data].map { |form| form[:attributes] }
    end
  end

  def show
    form = @organization.forms.includes({zoho_connection: :integration}, {quickbooks_connection: :integration}).find_by(id: params[:id])
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
