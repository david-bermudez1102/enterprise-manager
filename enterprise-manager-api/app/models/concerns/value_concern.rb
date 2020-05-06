module ValueConcern
  extend ActiveSupport::Concern

  def generate_key_value
    unless record_value.nil? || RecordKey.joins(:field => :form).where(fields:{form_id:form.id}).empty?
      if record_key
        begin
          create_value
          update_empty_values
          create_key_values
        rescue => error
          puts error
          throw(:abort)
        end
      end
    end
  end

  private
    def record_key
      RecordKey.find_by(resource_field_id: record_field.field.id)
    end

    def new_key_value
      if found_key_value.nil?
        create_key_value
      else
        found_key_value
      end
    end

    def found_key_value
      KeyValue.this_month.find_by(record_value_id:record_value.id, record_key:record_key)
    end

    def key_values
      KeyValue.this_month.where(record_key:record_key)
    end

    def create_value
      Value.create(record:record, field_id:record_key.field_id, record_field_id:record_key.field.record_field_id, content: new_key_value.value, key_value:new_key_value)
    end

    def create_key_value
      new_value = record_value.build_key_value(record_value:record_value, record_key: record_key,value: key_value_content)
      record_value.key_value_id = new_value.id
      record_value.save
      new_value
    end

    def update_empty_values
      Value.this_month.where(content:"", record_field_id:record_key.field.record_field_id).update_all(content: new_key_value.value)
    end

    def create_key_values
      Record.includes(:values).where(values: {record_value_id: record_value.id}, form_id:form.id).each do |rec|
        rec.values.find_or_create_by(content:new_key_value.value, record_field_id:record_key.field.record_field_id)
      end
    end

    def key_value_content
      count = key_values ? key_values.size : 0
      count = count + 1 < 10 ? "0#{count + 1}" : count + 1
      new_value = "#{self.created_at.strftime("%m%y")}-#{count}"
      new_value
    end

end