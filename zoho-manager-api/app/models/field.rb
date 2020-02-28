class Field < ApplicationRecord
  belongs_to :form
  has_many :values
  enum field_type: [ "text", "password", "selectable", "checkbox", "radio" ]
  has_one :selectable_resource
  has_many :options
  accepts_nested_attributes_for :selectable_resource, allow_destroy: true, reject_if:proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
end
