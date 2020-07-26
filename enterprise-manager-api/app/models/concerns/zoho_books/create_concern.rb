module ZohoBooks::CreateConcern
  extend ActiveSupport::Concern
  require 'httparty'

  module ClassMethods
    def create_in_zoho(authorization, root_url, zoho_organization_id, body, form = nil)
      headers = {
        "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization" => authorization
      }

      # if form doesn't an invoice_number field, it will be auto_generated when creating invoices 
      invoice_number = form ? form.fields.find_by("zoho_field_name = ? or name= ?", "invoice_number", "invoice_number") : nil
      if invoice_number
        url = "#{root_url}?organization_id=#{zoho_organization_id}&ignore_auto_number_generation=true"
      else
        url = "#{root_url}?organization_id=#{zoho_organization_id}"
      end

      model_name = self.model_name.to_s.split('::').last.downcase.pluralize

      new_body = body.select do |record| 
        Record.includes(:zoho_integration_record).find_by(id:record["id"]).zoho_integration_record.nil? 
      end

      if new_body.size > 0
        new_body.map do |r|
          line_items = (r["line_items"] || []).map { |item| item["id"] }
          response = HTTParty.post(url, headers: headers, body:{ JSONString: r.to_json })
          response = JSON.parse(response&.body || "{}")

          if response["code"] == 0
            records = Record.includes(:zoho_integration_record).where("id = ? or id IN (?)", r["id"], line_items)
            
            records.map do |record|
              record.update(zoho_integration_record_attributes:{ external_id:response["#{model_name.singularize}"]["#{model_name.singularize}_id"],connection:record.form.zoho_connection, record_id: record.id })
              RecordSerializer.new(record).serializable_hash[:data]
            end
                     
          else
            { error: response["message"], recordId: r["id"]}
          end
        end.flatten
      else 
        { errors: ["all #{model_name} for the selected period of time have already been sent to Zoho. If you'd like to update records, use the update options."]}
      end
    end
  end
  
end