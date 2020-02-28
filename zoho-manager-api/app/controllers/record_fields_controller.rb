class RecordFieldsController < ApplicationController
  def index
    fields = @form.fields
    render json: FieldSerializer.new(fields)
  end

  private
    def set_form
      @form = Form.find(params[:form_id])
    end
end
