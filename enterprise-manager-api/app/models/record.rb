class Record < ApplicationRecord
  include FilterableConcern
  include ::StatisticConcern
  include ::StoryConcern
  belongs_to :form, counter_cache: true, touch: true
  has_one :organization, through: :form
  belongs_to :account, touch: true
  has_many :values, -> { order(created_at: :desc) }, dependent: :destroy
  has_one :zoho_integration_record, class_name:"IntegrationRecord", foreign_key: "zoho_integration_record_id", dependent: :delete
  has_one :quickbooks_integration_record, class_name:"IntegrationRecord", foreign_key: "quickbooks_integration_record_id", dependent: :delete

  before_create :generate_values_that_are_empty
  after_create :generate_content_after_dependents
  after_update :generate_content_after_dependents
  #after_create :generate_combined_field_value

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

=begin 
  def generate_combined_field_value
    values.each do |value|
      if value.record_field.field_type == "combined_field"
        @content = []
        value.record_field.combined_fields.each do |combined_field|
          if combined_field == "createdAt"
            @content << created_at
          elsif combined_field == "updatedAt"
            @content << updated_at
          else
            found_value = values.find { |v| v.record_field_id == combined_field}
            @content << found_value.content if found_value
          end
        end
        value.content = value.record_field.format(@content)
        value.save!
      end
    end
  end 
=end

  def generate_values_that_are_empty
    form.fields.joins(:values).where.not(values:values).includes(:values, :record_field).distinct.each do |field|
      values.build(record_field_id: field.record_field_id)
    end
  end

  def generate_content_after_dependents
    values.select { |v| v.field_dependents.size > 0 }.map do |value|
      value.update_attribute(:content_after_dependents,content_generator(value, value.field_dependents))
      
    end
  end

  def content_generator(value, dependents)
    final_value = value.content
    final_value = final_value.to_f if value.field.field_type == "numeric_field"
    percentages = 0

    dependents.each do |d|
      field_dependent = d

      sub_dependent = field_dependent.sub_dependents.find_by(sub_dependent_option_id: values.pluck(:option_id) )

      if !sub_dependent && field_dependent.dependent_field.field_type == "selectable"
        current_value = values.joins(:field).find_by(fields:{ id: field_dependent.dependent_field_id })
        current_value = current_value.record_value.record.values.find_by(record_field_id: field_dependent.resource_field_id) if current_value && current_value.record_value
      elsif sub_dependent
        field_dependent = sub_dependent
        current_value = values.find_by(option_id:field_dependent.sub_dependent_option_id)
      else
        current_value = values.joins(:field).find_by(fields:{ id: field_dependent.dependent_field_id })
      end

      if current_value
        is_percentage = field_dependent.is_percentage
        is_percentage_from_dependent = field_dependent.is_percentage_from_dependent
        dependent_content = field_dependent.content
        content = current_value.content
        content = dependent_content if dependent_content && dependent_content != ""
        content = content.to_f if value.field.field_type == "numeric_field"
        content = 0 if is_percentage && !is_percentage_from_dependent
        percentages += field_dependent.content.to_f if is_percentage && !is_percentage_from_dependent
        content = content * current_value.content.to_f / 100 if is_percentage_from_dependent
        
        case field_dependent.operation
          when "replace"
            if content != "" && content != 0
              final_value = content
              percentages = 0
              break
            end
          when "copy"
            final_value += content
          when "add"
            final_value += content
          when "multiply"
            final_value *= content
          when "divide"
            final_value = final_value/content
          when "subtract"
            final_value -= content
          when "dependent_times"
            final_value += current_value.content.to_f * content
          else
            "Error: capacity has an invalid"
          end
    
      end
    end
    puts final_value
    final_value + (final_value * percentages/100)
  end

  def cache_key
    "/records/#{id}-#{form.records_count}-#{values.size}-#{updated_at.to_i}"
  end
end
