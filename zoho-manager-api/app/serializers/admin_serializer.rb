class AdminSerializer
  include FastJsonapi::ObjectSerializer
  attribute :id do |object|
    object.account.id
  end

  attribute :name do |object|
    object.account.name
  end

  attribute :email do |object|
    object.account.email
  end

  attribute :type do |object|
    object.account.accountable_type
  end
end
