class Value < ApplicationRecord
  include ::ValueConcern
  belongs_to :field, touch: true, optional: true
  belongs_to :record_field, touch: true, optional: true
  belongs_to :record, touch: true
  has_one :form, through: :record
  belongs_to :option, optional: true, touch: true
  belongs_to :record_value, touch: true, class_name:"Value", optional: true
  belongs_to :key_value, optional: true, touch: true
  has_many :checkbox_options, dependent: :delete_all
  before_create :generate_key_value
  after_save :touch_selectable_resource

  accepts_nested_attributes_for :checkbox_options, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  scope :this_month, -> { where(created_at: Time.now.beginning_of_month..Time.now.end_of_month) }

  def cache_key
    "/values/#{id}-#{updated_at}"
  end

  private
    def touch_selectable_resource
      selectable_resource = SelectableResource.where(resource_field_id: record_field.field.id).where.not( record_field:nil)
      selectable_resource.each { |sel| sel.record_field.touch} if selectable_resource
    end
end
