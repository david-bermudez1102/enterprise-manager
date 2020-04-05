class AccountMailer < ApplicationMailer
  def welcome_email
    @account = params[:account];
    @one_time_password = params[:one_time_password];
    @url  = params[:url];
    mail(to: @account.email, subject: "Welcome to #{@account.organization.name}")
  end
end
