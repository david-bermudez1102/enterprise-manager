class LikeSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attributes :id, :account_id
end
