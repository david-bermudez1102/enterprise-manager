class Field < ApplicationRecord
  belongs_to :form
  enum field_type: %w[text password selectable checkbox radio key_field]
  has_one :selectable_resource, dependent: :nullify
  has_one :record_key, dependent: :nullify
  has_one :record_field, dependent: :nullify
  has_many :options, dependent: :nullify
  has_many :values, through: :record_field
  
  accepts_nested_attributes_for :selectable_resource,
                                allow_destroy: true,
                                reject_if: proc { |attributes|
                                  attributes.all? { |key, value|
                                    key == "_destroy" || value.blank?
                                  }
                                }
  accepts_nested_attributes_for :options,
                                allow_destroy: true,
                                reject_if: proc { |attributes|
                                  attributes.all? { |key, value|
                                    key == "_destroy" || value.blank?
                                  }
                                }
  accepts_nested_attributes_for :record_key,
                                allow_destroy: true,
                                reject_if:
                                  proc { |attributes|
                                    attributes.all? { |key, value|
                                      key == '_destroy' || value.blank?
                                    }
                                  }
end
