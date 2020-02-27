class Field < ApplicationRecord
  belongs_to :form
  has_many :values
  enum field_type: [ "text", "password", "selectable", "checkbox", "radio" ]
  has_one :selectable_resource
  has_many :options
end
