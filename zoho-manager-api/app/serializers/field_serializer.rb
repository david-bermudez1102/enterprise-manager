class FieldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :field_type, :form_id
  attribute :selectable_resource, if: Proc.new { |field|
    field.field_type == "selectable"
  } do |field|
    field.selectable_resource ? { options: field.selectable_resource.form.fields[0].values.map do |value|
      value.content
    end }
     : nil
  end
  attribute :options, if: Proc.new { |field|
    field.field_type == "selectable"
  }
end
