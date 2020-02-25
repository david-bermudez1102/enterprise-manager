class FormsController < ApplicationController
  def create
    organization = Organization.find(form_params[:organization_id])
    form = Form.new(form_params)

  end

  private
    def form_params
      params.require(:resource).permit(:name,:organization_id)
    end
end
