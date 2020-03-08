class KeyValue < ApplicationRecord
  belongs_to :record_key
  belongs_to :record_value, class_name: "Value", optional:true
  belongs_to :option, optional: true, dependent: :destroy
  validates :value, uniqueness: true

  before_destroy :nullify_record_value

  def nullify_record_value
    self.record_value.key_value_id = nil;
    self.record_value.save
  end
end
