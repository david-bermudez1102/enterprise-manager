class RootSerializer
  include FastJsonapi::ObjectSerializer
  attribute :account do |obj|
    AccountSerializer.new(obj.account).serializable_hash[:data][:attributes]
  end
end
