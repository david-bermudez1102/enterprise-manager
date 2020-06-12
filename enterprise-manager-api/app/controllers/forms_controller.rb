class FormsController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_forms, only: [:index, :show, :update, :create]

  def create
    form = @forms.build(form_params)
    if form.save
      serialized_data = FormSerializer.new(form).serializable_hash
      render json: serialized_data[:data][:attributes]
    else
      render json: { errors: form.errors.full_messages}
    end
  end

  def index
    if stale?(@forms, public:true)
      serialized_data = FormSerializer.new(@forms).serializable_hash
      render json: serialized_data[:data].map { |form| form[:attributes] }
    end
  end

  def show
    form = @forms.find_by(id: params[:id])
    render json: FormSerializer.new(form)
  end

  def update
    form = @forms.find_by(id: params[:id])
    if form.update(form_params)
      serialized_data = FormSerializer.new(form).serializable_hash
      render json: serialized_data[:data][:attributes]
    else
      render json: { errors: form.errors.full_messages }
    end
  end

  def destroy
    form = @organization.forms.find_by(id: params[:id])
    if form.destroy
      render json: { id: params[:id], messages: ['Success'], destroyed:true }
    else
      render json: { errors: form.errors.full_messages }
    end
  end

  private

  def form_params
    params.require(:form).permit(:name, :organization_id, zoho_connection_attributes:[:id, :name, :integration_id, :connection_type, :form_id], quickbooks_connection_attributes:[:id, :name, :integration_id, :connection_type, :form_id], fields_attributes:[:id, :name, :zoho_field_name], record_fields_attributes:[:id, :name, :zoho_field_name], permission_attributes:[assignments_attributes:[:id, :role_id, :create_privilege, :update_privilege, :delete_privilege, :insert_privilege, :read_privilege]])
  end

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end

  def set_forms
    @forms = @organization.forms.includes({zoho_connection: :integration}, {quickbooks_connection: :integration}, {permission: :assignments}, {record_fields: [{field:[:record_key, :selectable_resource]}]}, {fields:[:record_key]})
  end
end
