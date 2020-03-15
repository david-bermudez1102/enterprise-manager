class AccountSerializer
  include FastJsonapi::ObjectSerializer
  attribute :id, :name, :email
end
