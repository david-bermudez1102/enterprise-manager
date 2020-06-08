module ZohoBooks::SyncConcern
  extend ActiveSupport::Concern
  require 'httparty'

  module ClassMethods

    def sync_from_zoho(form, authorization, root_url, zoho_organization_id, contact_name_contains, merge_records, filterable_params, current_account, body_params)

      model_name = self.model_name.to_s.split('::').last.downcase.pluralize

      if contact_name_contains
        url = "#{root_url}?contact_name_contains=#{contact_name_contains}&organization_id=#{zoho_organization_id}"
      else
        url = "#{root_url}/?organization_id=#{zoho_organization_id}"
      end

      headers = {
        "Authorization" => authorization
      }

      body = body_params.select{ |record| !Record.find_by(id:record["id"]).zoho_integration_record.nil? }
    
      records = form.records.includes({:values => [:form, :record_value, :record_field]}, :zoho_integration_record, :quickbooks_integration_record, :account).order(:created_at).with_filters(filterable_params).where(is_deleted:false)

      response = HTTParty.get(url, headers: headers)
      response = JSON.parse(response&.body || "{}")

      new_response = response[model_name].select do |zoho_api| 
        body.any? do |record| 
          record["zoho_books_id"] == zoho_api["#{model_name.singularize}_id"]
        end
      end

      serialized_records = []

      new_response.each { |zoho_api|

        new_values_attributes = []

        form.record_fields.where("zoho_field_name IN (?) or lower(name) IN (?)", zoho_api.keys, zoho_api.keys.map { |k| k.gsub("_", " ") }).each do |record_field|
          zoho_value = !record_field.zoho_field_name.nil? ? zoho_api["#{record_field.zoho_field_name}"] : zoho_api["#{record_field.name.downcase.split(" ").join("_")}"]

          if Record.joins(:zoho_integration_record).find_by(integration_records: { external_id: zoho_api["#{model_name.singularize}_id"] })
            
            if merge_records == "true"
              serialized_records.concat(records.where(integration_records: { external_id: zoho_api["#{model_name.singularize}_id"] }).map do |record| 
                if record.values.where(record_field_id: record_field.id ).first_or_initialize(content: zoho_value).update(content: zoho_value)
                  record = Record.find_by(id:record.id)
                  RecordSerializer.new(record).serializable_hash[:data]
                end
              end)
            else
              serialized_records.concat(RecordSerializer.new(records.where(integration_records: { external_id: zoho_api["#{model_name.singularize}_id"] })).serializable_hash[:data])
            end
            
          else 
            new_values_attributes << { record_field: record_field, content: "#{zoho_value}" }
          end
        end
        
        if new_values_attributes.length > 0
          begin
            record = form.records.build(values_attributes: new_values_attributes, account_id:current_account.id)
            if record.save
              record.update(zoho_integration_record_attributes:{external_id:zoho_api["#{model_name.singularize}_id"],connection:form.zoho_connection, record_id: record.id})
              serialized_records << RecordSerializer.new(record).serializable_hash[:data]
            else
              throw(:abort)
            end
          rescue => error
            puts error
            throw(:abort)
          end
        end
          
      }

    records_not_in_zoho = records.select do |record| 
      !record.zoho_integration_record.nil? && response[model_name].none? do |zoho_api| 
        record.zoho_integration_record.external_id == zoho_api["#{model_name.singularize}_id"]
      end
    end

    records_not_in_zoho.each do |record| 
      record.zoho_integration_record.destroy
    end

    serialized_records.flatten.concat(records_not_in_zoho.map do |record| 
        RecordSerializer.new(record).serializable_hash[:data]
      end).reverse.uniq { |record| record[:id]}.reverse ## Select records with zoho_id but are deleted from zoho
    end

  end 
end