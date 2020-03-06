class Value < ApplicationRecord
  belongs_to :field, optional: true
  belongs_to :record_field, optional: true
  belongs_to :record
  belongs_to :option, optional: true
  belongs_to :record_value, class_name:"Value", optional: true
  belongs_to :key_value, optional: true

  def generate_key_value
    if self.field.record_key
      unless self[:key_value]
        self[:key_value].create(record_key:self.field.record_key, record_value:self[:record_value], option:self[:option])
      end
    end
  end
end
