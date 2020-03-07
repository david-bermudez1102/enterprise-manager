class Value < ApplicationRecord
  belongs_to :field, optional: true
  belongs_to :record_field, optional: true
  belongs_to :record
  belongs_to :option, optional: true
  belongs_to :record_value, class_name:"Value", optional: true
  belongs_to :key_value, optional: true
  before_create :generate_key_value

  def generate_key_value
    unless self.record_value.nil?
      if self.record_value.key_value.nil?
        unless RecordKey.find_by(resource_field_id: self.record_field.field.id).nil?
          unless KeyValue.find_by(record_value_id:self.record_value.id)
          record_key = RecordKey.find_by(resource_field_id: self.record_field.field.id)
          key_value = KeyValue.where(record_key: record_key)
          count = key_value ? key_value.size : 0
          value = "#{self.created_at.strftime("%m%y")}-#{count+1}"
          record_value.build_key_value(record_value:record_value, record_key: record_key,value: value)
          record_value.save
          end
        end
      end
    end
  end
end
