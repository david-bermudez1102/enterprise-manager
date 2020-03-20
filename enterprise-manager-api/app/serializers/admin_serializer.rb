class AdminSerializer
  include FastJsonapi::ObjectSerializer
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

  attribute :avatar, if: Proc.new { |object|
    !object.account.avatar.attachment.nil?
  } do |object|
    {url: Rails.application.routes.url_helpers.rails_blob_path(
      object.account.avatar,
      only_path: true,
    ), margin_left: object.account.avatar_margin_left, margin_top: object.account.avatar_margin_top }
  end

  attribute :organization_id
end
