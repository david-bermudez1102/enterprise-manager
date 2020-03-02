class Form < ApplicationRecord
  belongs_to :organization
  has_many :fields, dependent: :delete_all
  has_many :records, dependent: :delete_all
  has_many :record_fields, dependent: :delete_all
  has_many :values, through: :records

  validates :name, length: { in: 2..12 }

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
        new_form_alias unless Form.find_by(form_alias: new_form_alias)
        count += 1
      end
    end
  end
end
