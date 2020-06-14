class PermissionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attribute :assignments_attributes do |obj|
    AssignmentSerializer.new(obj.assignments).serializable_hash[:data].map do |assignment|
      assignment[:attributes]
    end
  end

  attribute :exclusions_attributes do |obj|
    ExclusionSerializer.new(obj.exclusions).serializable_hash[:data].map do |exclussion|
      exclussion[:attributes]
    end
  end

end
