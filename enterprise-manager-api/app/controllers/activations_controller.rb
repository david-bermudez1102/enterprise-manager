class ActivationsController < ApplicationController
  before_action :set_activation

  def show
    if @activation && !@activation.account.activated
      render json: { name: @activation.account.name, message: "success" }
    elsif @activation && @activation.account.activated
      render json: { name: @activation.account.name, activated:true, message: "success" }
    else
      render json: { errors: ["Token doesn't exist or has expired."] }
    end
  end

  def update
    if @activation && !@activation.account.activated && @activation.account.update(activation_params) && @activation.account.update(activated:true) && @activation.destroy
      render json: { messages: ["Password changed successfully. You can now login."] }
    else
      render json: { errors: @activation.account.errors.full_messages }
    end
  end

  private

  def activation_params
    params.require(:activation).permit(:password, :password_confirmation)
  end

  def set_activation
    @activation = Activation.find_by(token: params[:id])
  end
end
