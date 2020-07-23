class Form < ApplicationRecord
  include ::StoryConcern
  belongs_to :organization, touch: true
  has_one :zoho_connection, class_name:"Connection", foreign_key: "zoho_connection_id", dependent: :destroy
  has_one :quickbooks_connection, class_name:"Connection", foreign_key: "quickbooks_connection_id", dependent: :destroy
  has_many :fields, -> { order(position: :asc) }, dependent: :destroy
  has_many :records, dependent: :destroy
  has_many :record_fields, dependent: :destroy
  has_many :values, through: :records
  has_one :permission, as: :permissionable
  has_many :exclusions, through: :permission
  has_many :roles, through: :organization
  
  validates :name, length: { in: 2..20 }
  has_many :selectable_resources, dependent: :destroy
  before_create :generate_form_alias
  after_save :nullify_form_alias, if: :saved_change_to_name?

  scope :this_month, -> { where(created_at: DateTime.now.beginning_of_month..DateTime.now.end_of_month) }

  accepts_nested_attributes_for :fields, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :record_fields, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }
  
  accepts_nested_attributes_for :zoho_connection, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :quickbooks_connection, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  accepts_nested_attributes_for :permission, update_only: true, allow_destroy: true, reject_if: proc { |attributes| attributes.all? { |key, value| key == "_destroy" || value.blank? } }

  def name
    self[:name].split.map(&:capitalize).join(' ')
  end
  
  def form_alias
    self.update_attribute(:form_alias, generate_form_alias) if self[:form_alias].nil?
    self[:form_alias]
  end

  def nullify_form_alias
    self.update_attribute(:form_alias, nil)
  end

  def generate_form_alias
    form_alias = ActiveSupport::Inflector.transliterate(self.name) # change ñ => n
      .downcase # only lower case
      .gsub(/[^a-z]/, "_") # any character that is not a letter or a number will be _
      .gsub(/\A_+/, "") # remove underscores at the beginning
      .gsub(/_+\Z/, "") # remove underscores at the end
      .gsub(/_+/, "_")       # maximum an underscore in a row

    find_unique_form_alias(form_alias)
  end

  def find_unique_form_alias(form_alias)
    form = Form.find_by(form_alias: form_alias)
    unless form
      form_alias
    else
      count = 0
      while true
        new_form_alias = "#{form_alias}_#{count}"
        return new_form_alias unless Form.find_by(form_alias: new_form_alias)
        count += 1
      end
    end
  end

  def records_count
    records.select(:id).where(:is_deleted => false).size
  end

  def deleted_records_count
    records.select(:id).where(:is_deleted => true).size
  end

  def current_month_records_count
    records.select(:id).where(:is_deleted => false).with_current_month(nil).size
  end

  def current_month_deleted_records_count
    records.select(:id).where(:is_deleted => true).with_current_month(nil).size
  end

  def last_record_date
    records.order(:created_at).select(:created_at).last
  end

  def cache_key
    "/forms/#{id}-#{records_count}-#{updated_at}"
  end
end
