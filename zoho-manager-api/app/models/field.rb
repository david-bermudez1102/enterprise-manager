class Field < ApplicationRecord
  belongs_to :form
  has_many :values
end
