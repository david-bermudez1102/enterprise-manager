class RecordFieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :field_id, :name, :field_type, :form_id
  attribute :record_key do |record_field|
    record_field.field ? record_field.field.record_key : nil
  end
  attribute :selectable_resource, if: proc { |field|
                          field.field_type == "selectable"
                        } do |object|
    if object.selectable_resource
    { options: object.selectable_resource.form.fields.find_by(id: object.selectable_resource.resource_field_id).values.map do |value|
      { id: value.id, value: value.content }
    end || [] } 
  end
  end
  attribute :options, if: proc { |field|
              field.field_type == "selectable" || field.field_type == "radio" || field.field_type == "checkbox"
            }
end