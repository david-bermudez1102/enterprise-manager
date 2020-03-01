class RecordField < ApplicationRecord
  belongs_to :form
  belongs_to :field, optional: true
  has_many :values, dependent: :delete_all
  enum field_type: %w[text password selectable checkbox radio]
  has_one :selectable_resource, dependent: :nullify
  has_many :options, dependent: :nullify
  accepts_nested_attributes_for :selectable_resource,
                                allow_destroy: true,
                                reject_if:
                                  proc { |attributes|
                                    attributes.all? { |key, value|
                                      key == '_destroy' || value.blank?
                                    }
                                  }
  accepts_nested_attributes_for :options,
                                allow_destroy: true,
                                reject_if:
                                  proc { |attributes|
                                    attributes.all? { |key, value|
                                      key == '_destroy' || value.blank?
                                    }
                                  }
end
