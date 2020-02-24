class AccountSerializer
  include FastJsonapi::ObjectSerializer
  attribute :id do |object|
    object.id
  end

  attribute :name do |object|
    case object.userable_type
    when "admin"
      object.admin.name
    when "manager"
      object.manager.name
    when "employee"
      object.emoloyee.name
  end

  attribute :email do |object|
    case object.userable_type
    when "admin"
      object.admin.email
    when "manager"
      object.manager.email
    when "employee"
      object.emoloyee.email
  end
end
