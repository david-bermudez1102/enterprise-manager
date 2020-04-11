class Account < ApplicationRecord
  belongs_to :accountable, polymorphic: true
  belongs_to :organization
  validates :name, presence: :true
  validates :email, format: {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}, uniqueness: {message:"already belongs to an existing account"}
  validates :password, presence: true, length: { in: 6..50 }, format: { without: /\s/ }, :on => :create
  has_one_attached :avatar
  has_one :activation, dependent: :destroy
  has_secure_password

  def avatar_path
    ActiveStorage::Blob.service.path_for(avatar.key)
  end

  def lock_account(account)
    if account.failed_attempts == 3
        account.locked = true
        recovery_token = SecureRandom.hex(64)
        account.recovery_token = recovery_token
        render json: {errors: ["Account has been locked for security reasons. An email has been sent to you with the password reset instructions. If you don't have access to this email, please contact your admin."]}
        AccountMailer.with(account: account, url:request.host(), token:recovery_token).reset_password_email.deliver_later
      else
        render json: {errors: ["Your password is incorrect. Your account will be locked after #{3-account.failed_attempts} more failed attempts."]}
        account.failed_attempts = account.failed_attempts + 1
      end
      account.save
  end
end
