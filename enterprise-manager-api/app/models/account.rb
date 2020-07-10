class Account < ApplicationRecord
  belongs_to :accountable, optional: true, polymorphic: true
  belongs_to :root, optional: true
  belongs_to :organization
  validates :name, presence: :true
  validates :email, format: {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}, uniqueness: {message:"already belongs to an existing account"}
  validates :password, presence: true, length: { in: 6..50 }, format: { without: /\s/ }, :on => :create
  validates :root, presence: :true, unless: Proc.new { |obj| obj.accountable_type =="Root" }

  has_one_attached :avatar
  has_one :activation, dependent: :destroy
  has_many :records, dependent: :destroy
  has_many :account_roles, dependent: :delete_all
  has_many :roles, through: :account_roles
  has_many :exclusions, dependent: :delete_all
  has_many :messages
  has_many :open_conversations
  has_many :conversations, through: :open_conversations, dependent: :nullify
  has_many :values, dependent: :nullify

  validates :roles, :length => { :minimum => 1 }

  has_secure_password

  def avatar_src
    if avatar.attached?
      "http://localhost:3001#{Rails.application.routes.url_helpers.rails_blob_path(
        avatar,
        only_path: true,
      ) }"
    else
      nil
    end
  end

  def self.lock_account(account,url)
    if account.failed_attempts == 3
        account.locked = true
        token = SecureRandom.hex(64)
        account.build_activation(token:token)
        errors = ["Account has been locked for security reasons. An email has been sent to you with the password reset instructions. If you don't have access to this email, please contact your admin."]
        AccountMailer.with(account: account, url:url, token:token).reset_password_email.deliver_later
      else
        errors = ["Your password is incorrect. Your account will be locked after #{3-account.failed_attempts} more failed attempts."]
        account.failed_attempts = account.failed_attempts + 1
      end
      account.save
      return errors
  end

  def is_root
    accountable_type == "Root"
  end
end
