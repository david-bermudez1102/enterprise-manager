class CommentSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  attributes :id, :account_id, :content, :commentable_id
  
  attribute :author do |obj|
    AccountSerializer.new(obj.account).serializable_hash[:data][:attributes].slice(:id, :name, :avatarSrc)
  end

  attribute :likes do |obj|
    LikeSerializer.new(obj.likes).serializable_hash[:data].map { |data| data[:attributes] }
  end

  attributes :created_at, :updated_at
end
