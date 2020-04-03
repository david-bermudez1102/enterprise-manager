class ZohoBooks::Invoice < ApplicationRecord
  
  def self.create_records(url, headers, form_id)
    values(form_id).map do |value|
      key_value = key_value(value)
      integration = integration(key_value)
        if integration
          body = body(key_value, form_id, integration)
          response = post_request(url, headers, body, form_id)
          if response["code"] == 0
            update_record(value, response)
          else
            response
          end
        end
    end
  end

  def self.values(form_id)
    Value.joins(:key_value).group("key_values.value").joins(:record).where(records:{form_id:form_id})
  end

  def self.key_value(value)
    value.key_value
  end

  def self.record_value(value)
    value.record_value
  end

  def self.integration(key_value)
    zoho_integration_record(key_value.record_value)
  end

  def self.zoho_integration_record(record_value)
    record_value ? record_value.record.zoho_integration_record : null
  end

  def self.connection(integration)
    integration.connection
  end

  def self.connection_type(connection)
    connection_type = "#{connection.connection_type.singularize}_id"
    connection_type=="contact_id" ? "customer_id" : connection_type
  end

  def self.external_id(integration)
    integration.external_id
  end

  def self.records(key_value, form_id)
     Record.joins(:values).where(values:{content:key_value.value}, form_id:form_id)
  end

  def self.line_items(key_value, form_id)
    self.records(key_value, form_id).map do |record|
      line_items = {}
      values = record.values.select do |value| 
        record_value = record_value(value)
        integration_record = record_value ? zoho_integration_record(record_value) : nil
        connection_type = integration_record ? integration_record.connection.connection_type : nil
        record_value && integration_record && connection_type=="items"
      end
      values.map do |value|
        integration_record = value.record_value.record.zoho_integration_record
        line_items["item_id"] = integration_record.external_id
        value.record.values.map do |value|
          if value.record_value
            if !value.record_value.record.zoho_integration_record
              line_items[value.record_field.name] = value.content
            end
          elsif !value.key_value
            line_items[value.record_field.name] = value.content
          end
        end     
      end.compact
      line_items
    end.delete_if &:empty?
  end

  def self.body(key_value, form_id, integration)
    connection = connection(integration)
    body = {}
    body[connection_type(connection)] = external_id(integration)
    body[key_value.record_key.field.name] = key_value.value
    body["line_items"] = line_items(key_value, form_id)
    body
  end

  def self.post_request(url, headers, body, form_id)
    response = HTTParty.post(url, headers: headers, body:{JSONString: body.to_json})
    response = JSON.parse(response&.body || "{}")
    response
  end

  def self.update_record(value, response)
    record = value.record
    record.update(zoho_integration_record_attributes:{external_id:response["invoice"]["invoice_id"],connection:record.form.zoho_connection, record_id: record.id})
    RecordSerializer.new(record)
  end
end
