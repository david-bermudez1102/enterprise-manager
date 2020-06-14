class ExclusionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  #cache_options enabled: true, cache_length: 12.hours

  attributes :id, :permission_id, :account_id, :exclusion_type
end
