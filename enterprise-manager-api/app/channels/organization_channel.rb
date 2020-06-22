class OrganizationChannel < ApplicationCable::Channel
  def subscribed
    @organization = Organization.find(params[:organization_id])
    stream_for @organization
  end

  def received(data)
    serialized_data = PagePermissionSerializer.new(@page_permissions).serializable_hash[:data]
    serialized_data = serialized_data.map{ |data| data[:attributes] }
    PagePermissionChannel.broadcast_to(@organization, {pagePermissions: serialized_data})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
