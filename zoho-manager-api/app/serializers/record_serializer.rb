class RecordSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :form_id
  end
end
