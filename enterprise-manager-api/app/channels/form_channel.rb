class FormChannel < ApplicationCable::Channel
  def subscribed
    @form = Organization.find(params[:organization_id]).forms.find(params[:form_id])
    stream_for @form
  end

  def received(data)
    FormChannel.broadcast_to(@form, { values:serialized_values })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def serialized_values
    ValueSerializer.new(@form.values.includes(:record,:record_field, :record, { :record_value => [{ :record => [:zoho_integration_record] }, :key_value] }, :form, { :field => [:field_dependents, { :selectable_resource => [{ :form => [:zoho_connection] }] }] })).serializable_hash[:data].map { |data| data[:attributes]}
  end
end
