class AccountMailerPreview < ActionMailer::Preview
  def welcome_email
    AccountMailer.with(account: Account.first, url:"localhost", one_time_password: "12345").welcome_email
  end
end