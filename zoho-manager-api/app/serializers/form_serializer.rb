class FormSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :organization_id
  has_many :fields
end
