class ManagerSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attribute :id do |object|
    object.account.id
  end

  attribute :name do |object|
    object.account.name
  end

  attribute :email do |object|
    object.account.email
  end

  attribute :type do |object|
    object.account.accountable_type
  end

  attribute :activated do |object|
    object.account.activated
  end

  attribute :disabled do |object|
    object.account.disabled
  end

  attribute :locked do |object|
    object.account.locked
  end

  attribute :avatar, if: Proc.new { |object|
    !object.account.avatar.attachment.nil?
  } do |object|
    {url: Rails.application.routes.url_helpers.rails_blob_path(
      object.account.avatar,
      only_path: true,
    ), margin_left: object.account.avatar_margin_left, margin_top: object.account.avatar_margin_top }
  end
end
