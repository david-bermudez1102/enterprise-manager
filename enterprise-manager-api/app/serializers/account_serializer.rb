class AccountSerializer
  include FastJsonapi::ObjectSerializer
  attribute :id, :name, :email
  attribute :avatar, if: Proc.new { |object|
    !object.avatar.attachment.nil?
  } do |object|
    Rails.application.routes.url_helpers.rails_blob_path(
      object.avatar,
      only_path: true,
    )
  end

end
