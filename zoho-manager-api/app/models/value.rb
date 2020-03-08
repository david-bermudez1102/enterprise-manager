class Value < ApplicationRecord
  belongs_to :field, optional: true
  belongs_to :record_field, optional: true
  belongs_to :record
  belongs_to :option, optional: true
  belongs_to :record_value, class_name:"Value", optional: true
  belongs_to :key_value, optional: true
  before_create :generate_key_value
  has_many :checkbox_options

  accepts_nested_attributes_for :checkbox_options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  def generate_key_value
    unless self.record_value.nil?
      if self.record_value.key_value.nil?
        unless RecordKey.find_by(resource_field_id: self.record_field.field.id).nil?
          unless KeyValue.find_by(record_value_id:self.record_value.id)
          record_key = RecordKey.find_by(resource_field_id: self.record_field.field.id)
          key_value = KeyValue.where(record_key: record_key)
          count = key_value ? key_value.size : 0
          value = "#{self.created_at.strftime("%m%y")}-#{count+1}"
          new_key_value = record_value.build_key_value(record_value:record_value, record_key: record_key,value: value)
          new_key_value.save
          self.record_value.key_value_id = new_key_value.id
          self.record_value.save
           Value.create(record:self.record, field_id:record_key.field_id, record_field_id:record_key.field_id, content: value, key_value:new_key_value)
           Value.where(content: "", record_field_id:record_key.field_id).update_all(content: value)
           Record.joins(:values).where(values: {record_value_id: record_value.id}).map do |rec|
            rec.values.find_or_create_by(content:value, record_field_id:record_key.field_id)
           end
          end
        end
      else
        record_key = RecordKey.find_by(resource_field_id: self.record_field.field.id)
        value = Value.create(record:self.record, field_id:record_key.field_id, record_field_id:record_key.field_id, content: record_value.key_value.value, key_value:record_value.key_value)
        Value.where(content: "", record_field_id:record_key.field_id).update_all(content: record_value.key_value.value)
      end
    end
  end

end
