class PermissionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attribute :assignments_attributes do |obj|
    AssignmentSerializer.new(obj.assignments).serializable_hash[:data].map do |assignment|
      assignment[:attributes]
    end
  end

end
