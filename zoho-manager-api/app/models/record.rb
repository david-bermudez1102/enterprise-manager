class Record < ApplicationRecord
  belongs_to :form
  has_many :fields, through :form
end
