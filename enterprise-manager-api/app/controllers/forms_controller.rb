class FormsController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_forms, only: [:index, :show, :update, :create]

  def create
    form = @forms.build(form_params)
    authorize form
    if form.save
      serialized_data = FormSerializer.new(form).serializable_hash
      render json: serialized_data[:data][:attributes]
    else
      render json: { errors: form.errors.full_messages}
    end
  end

  def index
    @forms = policy_scope(@forms)
    authorize @forms
    if stale?(@forms, public:true)
      serialized_data = FormSerializer.new(@forms).serializable_hash
      render json: serialized_data[:data].map { |form| form[:attributes] }
    end
  end

  def show
    form = @forms.find_by!(id: params[:id])
    authorize form, policy_class: FormPolicy
    serialized_data = FormSerializer.new(form).serializable_hash[:data][:attributes]
    render json: serialized_data
  end

  def update
    form = @forms.find(params[:id])
    form.update!(form_params)
    serialized_data = FormSerializer.new(form).serializable_hash
    render json: serialized_data[:data][:attributes]
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
    params.require(:form).permit(:name, :organization_id, zoho_connection_attributes:[:id, :name, :integration_id, :connection_type, :form_id], quickbooks_connection_attributes:[:id, :name, :integration_id, :connection_type, :form_id], fields_attributes:[:id, :name, :zoho_field_name], record_fields_attributes:[:id, :name, :zoho_field_name], permission_attributes:[assignments_attributes:[:id, :role_id, :create_privilege, :update_privilege, :delete_privilege, :insert_privilege, :read_privilege], exclusions_attributes:[:id, :_destroy, :permission_id, :account_id, :exclusion_type]])
  end

  def set_organization
    @organization = Organization.find(params[:organization_id])
  end

  def set_forms
    @forms = @organization.forms.includes(:zoho_connection, :quickbooks_connection, { permission: [:assignments, :exclusions] }, { :roles => [{ :default_permission => [ {:permission => [:assignments, :exclusions] }] }] }, :records, { record_fields: [{ field:[:record_key, {:selectable_resource => [{ :form => [ { :fields => [{ :values => [{ :record => [:zoho_integration_record, :quickbooks_integration_record] }] }] }] }] }] }, :options] })
  end
end
