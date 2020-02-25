class FieldsController < ApplicationController
  before_action :set_form

  def create
    field = @form.fields.build(field_params)
    if field.save
      render json: FieldSerializer.new(field)
    end
  end

  def index
    fields = @form.fields
    render json: FieldSerializer.new(fields)
  end

  def show
    fields = @form.fields.find_by(id: params[:id])
    render json: FieldSerializer.new(field)
  end

  private
    def field_params
      params.require(:field).permit(:name,:field,:form_id)
    end

    def set_form
      @form = Form.find(params[:form_id])
    end
end
