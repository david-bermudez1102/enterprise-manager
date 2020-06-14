class FormSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  
  #cache_options enabled: true, cache_length: 12.hours
  attributes :id, :name, :form_alias, :organization_id, :records_count, :deleted_records_count, :current_month_records_count, :current_month_deleted_records_count

  attribute :zoho_connection_attributes do |obj|
    if obj.zoho_connection
      ConnectionSerializer.new(obj.zoho_connection).serializable_hash[:data][:attributes]
    end
  end

  attribute :permission_attributes do |obj|
    data = { assignmentsAttributes: [], exclusionsAttributes: [] }
    if obj.permission
      permissions = obj.roles.map do |role|
        permission = role.permissions.find_by(id:obj.permission.id)
        if permission
          permission
        else
         role.default_permission
        end
      end.uniq

      permissions.each do |permission|
        serialized_data = PermissionSerializer.new(permission).serializable_hash[:data][:attributes]
        if permission.class.name == "DefaultPermission"
          data[:assignmentsAttributes].concat(serialized_data[:assignmentsAttributes].each{ |assignment| assignment[:id] = nil})
        else
          data[:assignmentsAttributes].concat(serialized_data[:assignmentsAttributes])
        end
        data[:exclusionsAttributes].concat(serialized_data[:exclusionsAttributes])
      end
      data
    else
      { assignmentsAttributes: obj.roles.map do |role|
          data = PermissionSerializer.new(role.default_permission).serializable_hash[:data][:attributes][:assignmentsAttributes]  
          data.map{ |assignment| assignment[:id] = nil}
          data
        end.flatten,
        exclusionsAttributes: []
      }
    end
    
  end

  attribute :quickbooks_connection_attributes do |obj|
    if obj.quickbooks_connection
      ConnectionSerializer.new(obj.quickbooks_connection).serializable_hash[:data][:attributes]
    end
  end

  attribute :record_fields_attributes do |obj|
    if obj.record_fields
      RecordFieldSerializer.new(obj.record_fields).serializable_hash[:data].map { |r_f| r_f[:attributes]}
    end
  end
  
  attribute :last_record_date do |obj|
    if obj.last_record_date
      obj.last_record_date.created_at
    end
  end

end
