class AccountMailer < ApplicationMailer
  def welcome_email
    @account = params[:account]
    @url  = params[:url];
    mail(to: @account.email, subject: 'Welcome to My Awesome Site')
  end
end
