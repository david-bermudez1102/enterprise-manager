module Api::V1
  class FieldsController < ApplicationController
    before_action :set_form

    def create
      field = @form.fields.build(field_params)
      record_field = @form.record_fields.build(field_params)
      if field.save && record_field.save
        render json: FieldSerializer.new(field)
      end
    end

    def index
      fields = @form.fields
      render json: FieldSerializer.new(fields)
    end

    def show
      field = @form.fields.find_by(id: params[:id])
      render json: FieldSerializer.new(field)
    end

    def update
      field = @form.fields.find_by(id: params[:id])
      render json: FieldSerializer.new(field)
    end

    def destroy
      field = @form.fields.find_by(id: params[:id])
      if field.destroy
        render json: { id: params[:id], message: "Success" }
      end
    end

    private

    def field_params
      params.require(:field).permit(:name, :field_type, :form_id, selectable_resource_attributes: [:form_id, :resource_field_id], options_attributes: [:value])
    end

    def set_form
      @form = Form.find(params[:form_id])
    end
  end
end
