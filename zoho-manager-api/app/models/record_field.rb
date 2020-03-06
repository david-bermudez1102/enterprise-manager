class RecordField < ApplicationRecord
  belongs_to :form
  belongs_to :field, optional: true, dependent: :destroy
  has_many :values, dependent: :delete_all
  enum field_type: %w[text password selectable checkbox radio key_field]
  has_one :selectable_resource, dependent: :destroy
  has_many :options, dependent: :delete_all

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
