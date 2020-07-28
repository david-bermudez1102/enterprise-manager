class RecordsController < ApplicationController
  before_action :authenticate_user
  before_action :set_organization
  before_action :set_form
  before_action :set_is_deleted, only: %i[show index]
  
  def create
    Record.transaction do
      record = @form.records.create!(record_params)
      params[:id] = record.id
      params[:records_count] = @form.records_count
      params[:current_month_records_count] = @form.current_month_records_count
      render json: RecordSerializer.new(record, params:{ records_count: params[:records_count], current_month_records_count: params[:current_month_records_count]}).serializable_hash[:data]
    end
  end

  def update
    Record.transaction do
      record = @form.records.find(params[:id])
      record.update!(record_params)
      serialized_data = RecordSerializer.new(record).serializable_hash[:data]
      render json: serialized_data
    end
  end

  def index
    records = @form.records.includes({:values => [:form, :record_value]}, :zoho_integration_record, :quickbooks_integration_record).order(:created_at).with_filters(filterable_params).where(is_deleted:@is_deleted)
    if stale?(records, public:true)
      serialized_data = RecordSerializer.new(records.group(:id)).serializable_hash[:data]
      serialized_data.each.with_index(1) do |data, i| 
        data[:links][:values]["listingId"] = i
      end
      render json: serialized_data
    end
  end

  def show
    record = @form.records.includes({:values => [:form, :record_value]}, :zoho_integration_record, :quickbooks_integration_record).find_by(id: params[:id])
    if stale?(record,public:true)
      render json: RecordSerializer.new(record, params:{ records_count: params[:records_count], current_month_records_count: params[:current_month_records_count]}).serializable_hash[:data]
    end
  end

  def destroy
    record = @form.records.find_by(id: params[:id])
    if record.is_deleted && record.destroy
      render json: { id: params[:id], messages: ['Record was removed from'], destroyed: true, records_count:record.form.records_count }
    elsif record.update(is_deleted: true)
      serialized_data = RecordSerializer.new(record).serializable_hash[:data]
      serialized_data[:message] = "Record was moved to the Deleted Records folder."
      serialized_data[:archived] = true
      render json: serialized_data
    else
      render json: { errors: record.errors.full_messages }
    end
  end

  private

  def record_params
    params.require(:record).permit(:record_field_id, :content, values_attributes: [:id,:record_field_id, :content, :option_id, :record_value_id, :account_id, checkbox_options_attributes:[:option_id]]).merge(account_id:current_account.id)
  end

  def set_organization
    @organization = current_account.organization
  end

  def set_form
    @form = @organization.forms.find_by(id: params[:form_id])
  end

  def set_is_deleted
    if params[:deleted]
      @is_deleted = true
    else
      @is_deleted = false
    end
  end

  def filterable_params
    params.slice(:month_year, :from_date, :date_range, :current_month, :date, :query, :column_id)
  end
end
