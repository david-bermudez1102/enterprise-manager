class AccountMailer < ApplicationMailer
  def welcome_email
    @account = params[:account];
    @one_time_password = params[:one_time_password];
    @url  = params[:url];
    @token = params[:token];
    mail(to: @account.email, subject: "Welcome to #{@account.organization.name}")
  end

  def reset_password_email
    @account = params[:account];
    @url  = params[:url];
    @token = params[:token];
    mail(to: @account.email, subject: "#{@account.organization.name} | Account locked")
  end
end
