class AssignmentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id, :role_id, :create_privilege, :update_privilege, :delete_privilege, :read_privilege, :insert_privilege
end
