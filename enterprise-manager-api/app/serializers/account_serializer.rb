class AccountSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :id, :name, :email, :organization_id, :activated, :disabled, :locked, :role_ids, :is_root

  attribute :role_names do |obj|
    obj.roles.map { |role| role.name }
  end

  attribute :roles do |obj|
    RoleSerializer.new(obj.roles).serializable_hash[:data].map { |data| data[:attributes] }
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
