class RecordsController < ApplicationController
  before_action :set_form

  def create
    record = @form.records.build(form_params)
    if form.save
      render json: RecordSerializer.new(record)
    end
  end

  def index
    record = @form.records
    render json: RecordSerializer.new(record)
  end

  def show
    record = @form.records.find_by(id: params[:id])
    render json: RecordSerializer.new(record)
  end

  private
    def record_params
      params.require(:record).permit(:form_id, values_attributes:[:field_id,:value])
    end

    def set_form
      @form = Form.find(params[:form_id])
    end
end
