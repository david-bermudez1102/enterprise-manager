class RecordFieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :field_id, :name, :field_type, :form_id
  attribute :selectable_resource, if: Proc.new { |field|
                          field.field_type == "selectable"
                        } do |object|
    object.selectable_resource ? { options: object.selectable_resource.form.fields.find_by(id: object.selectable_resource.resource_field_id).values.map do |value|
      { id: value.id, value: value.content }
    end || [] } : nil
  end
  attribute :options, if: Proc.new { |field|
              field.field_type == "selectable"
            }
end
