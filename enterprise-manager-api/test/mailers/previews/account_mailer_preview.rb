class AccountMailerPreview < ActionMailer::Preview
  def welcome_email
    AccountMailer.with(account: Account.first, url:"localhost", one_time_password: "12345").welcome_email
  end

  def reset_password_email
    AccountMailer.with(account: Account.first, url:"localhost", token:"12345").reset_password_email
  end
end