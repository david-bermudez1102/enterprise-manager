class ActivationsController < ApplicationController
  before_action :set_activation

  def show
    if current_account && current_account != @activation.account
      raise ActiveRecord::RecordInvalid.new(current_account), "Not authorized"
    end
    if @activation && !@activation.account.activated && @activation.account.accountable_type != "Root"
      render json: { name: @activation.account.name, message: "success" }
    elsif @activation && @activation.account.activated
      render json: { name: @activation.account.name, activated:true, message: "success" }
    elsif @activation && !@activation.account.activated && @activation.account.accountable_type == "Root"
      render json: { name: @activation.account.name, root:true, message: "success" }
    else
      render json: { errors: ["Token doesn't exist or has expired."] }
    end
  end

  def update
    if @activation.account.accountable_type != "Root"
      Activation.transaction do
        @activation
        !@activation.account.activated
        @activation.account.update!(activation_params) 
        @activation.account.update!(activated:true)
        @activation.destroy!
        render json: { message: "Password changed successfully. You can now login." }
      end
    else
      Activation.transaction do
        @activation
        puts @activation.account.name
        if !@activation.account.authenticate(activation_params[:password])
          raise ActiveRecord::RecordInvalid.new(@activation.account), "Password incorrect, try again"
        end
        !@activation.account.activated
        @activation.account.update!(activated:true)
        @activation.destroy!
        render json: { message: "Your account was activated successfully." }
      end
    end
  end

  private

  def activation_params
    params.require(:activation).permit(:password, :password_confirmation)
  end

  def set_activation
    @activation = Activation.find_by!(token:params[:id])
  end
end
