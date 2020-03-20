class AccountSerializer
  include FastJsonapi::ObjectSerializer
  attribute :id, :name, :email
  attribute :avatar, if: Proc.new { |object|
    !object.avatar.attachment.nil?
  } do |object|
    {url: Rails.application.routes.url_helpers.rails_blob_path(
      object.avatar,
      only_path: true,
    ),margin_left: object.avatar_margin_left, margin_top: object.avatar_margin_top }
  end

end
