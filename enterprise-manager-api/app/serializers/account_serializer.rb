class AccountSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attribute :id, :name, :email, :organization_id, :activated, :disabled, :locked
  attribute :type do |object|
    object.accountable_type
  end
  attribute :avatar, if: Proc.new { |object|
    !object.avatar.attachment.nil?
  } do |object|
    {url: Rails.application.routes.url_helpers.rails_blob_path(
      object.avatar,
      only_path: true,
    ),margin_left: object.avatar_margin_left, margin_top: object.avatar_margin_top }
  end
end
