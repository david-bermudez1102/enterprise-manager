class StorySerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attributes :id

  attribute :author do |obj|
    AccountSerializer.new(obj.account).serializable_hash[:data][:attributes].slice(:id, :name, :avatarSrc)
  end

  attribute :subject do |obj|
    obj.storiable_type
  end

  attribute :action
  
  attribute :payload do |obj|
    case obj.storiable_type
    when "Form"
      obj.storiable.slice(:id, :name) if obj.storiable
      puts obj.storiable
    when "Record"
      obj.storiable.form.slice(:id, :name) if obj.storiable.form
    when "Field"
      obj.storiable.form.slice(:id, :name) if obj.storiable.form
    else
      obj.storiable
    end
    
  end

  attribute :likes do |obj|
    LikeSerializer.new(obj.likes).serializable_hash[:data].map { |data| data[:attributes] }
  end

  attribute :comments do |obj|
    CommentSerializer.new(obj.comments).serializable_hash[:data].map { |data| data[:attributes] }
  end
  
  attributes :created_at, :updated_at
end
