class FieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :field_type, :form_id
  attribute :selectable_resource, if: Proc.new { |field|
                          field.field_type == "selectable"
                        } do |object|
    object.selectable_resource ? { options: object.selectable_resource.resource_field.values.map do |value|
      { id: value.id, value: value.content } if value.content != ""
    end.compact } : nil
  end
  attribute :options, if: Proc.new { |field|
                        field.field_type == "selectable"
                      }
end
