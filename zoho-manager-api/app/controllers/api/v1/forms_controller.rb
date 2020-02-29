module Api::V1
  class FormsController < ApplicationController
    before_action :set_organization

    def create
      form = @organization.forms.build(form_params)
      if form.save
        render json: FormSerializer.new(form)
      end
    end

    def index
      forms = @organization.forms
      render json: FormSerializer.new(forms)
    end

    def show
      form = @organization.forms.find_by(id: params[:id])
      render json: FormSerializer.new(form)
    end

    private

    def form_params
      params.require(:form).permit(:name, :organization_id)
    end

    def set_organization
      @organization = Organization.find(params[:organization_id])
    end
  end
end
