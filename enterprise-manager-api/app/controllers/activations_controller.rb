class ActivationsController < ApplicationController
  
  def show
    activation = Activation.find_by(token: params[:id])
    if activation
      render json: { name: activation.account.name, message: "success" }
    else
      render json: { errors: ["Token doesn't exist or has expired."] }
    end
  end
end
