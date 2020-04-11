class AccountUnlockController < ApplicationController
  before_action :set_activation
  
  def update
    if @activation && @activation.account.update(activation_params) && @activation.account.update(locked:false,failed_attempts:0) && @activation.destroy
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
