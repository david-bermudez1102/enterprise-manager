class Record < ApplicationRecord
  include FilterableConcern
  include ::StatisticConcern
  include ::StoryConcern
  belongs_to :form, counter_cache: true, touch: true
  belongs_to :account, touch: true
  has_many :values, dependent: :destroy
  has_one :zoho_integration_record, class_name:"IntegrationRecord", foreign_key: "zoho_integration_record_id", dependent: :delete
  has_one :quickbooks_integration_record, class_name:"IntegrationRecord", foreign_key: "quickbooks_integration_record_id", dependent: :delete
  before_save :generate_combined_field_value

  accepts_nested_attributes_for :zoho_integration_record, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :quickbooks_integration_record, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :values

  scope :with_query, -> (query) {
    values = Value.arel_table
    joins(:values).where(values[:content].matches("%#{query}%"))
  }

  scope :with_column_id, -> (column_id) {
    joins(:values).where(values: {record_field_id:column_id})
  }

  def generate_combined_field_value
    values.each do |value|
      if value.record_field.field_type == "combined_field"
        @content = []
        value.record_field.combined_fields.each do |combined_field|
          @content << values.find {|v| v.record_field_id == combined_field}.content
        end
        value.content = value.record_field.format(@content)
      end
    end
  end

  def cache_key
    "/records/#{id}-#{form.records_count}-#{values.size}-#{updated_at.to_i}"
  end
end
