module ZohoBooks::UpdateConcern
  extend ActiveSupport::Concern
  require 'httparty'

  module ClassMethods

    def update_in_zoho(authorization, root_url, zoho_organization_id, body_params)
      
      model_name = self.model_name.to_s.split('::').last.downcase.pluralize

      headers = {
        "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization" => authorization
      }

      body = body_params.select do |record| 
        !Record.find_by(id:record["id"]).zoho_integration_record.nil?
      end

      responses = body.map do |r|
        zoho_id = r["zoho_books_id"]
        url = "#{root_url}/#{zoho_id}?organization_id=#{zoho_organization_id}"
        response = HTTParty.put(url, headers: headers, body:{JSONString: r.to_json})
        response = JSON.parse(response&.body || "{}")
        if response["code"] == 0
          record = Record.find_by(id:r["id"])
          record.update(zoho_integration_record_attributes:{ external_id:response["#{model_name.singularize}"]["#{model_name.singularize}_id"],connection:record.form.zoho_connection, record_id: record.id })
          RecordSerializer.new(record).serializable_hash[:data]
        else
          { error: response["message"], recordId: r["id"]}
        end
      end
    end
  end
  
end