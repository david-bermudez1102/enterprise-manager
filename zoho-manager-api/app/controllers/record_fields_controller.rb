class RecordFieldsController < ApplicationController
  before_action :set_form

  def index
    record_fields = @form.record_fields
    render json: RecordFieldSerializer.new(record_fields)
  end

  private

  def set_form
    @form = Form.find(params[:form_id])
  end
end
