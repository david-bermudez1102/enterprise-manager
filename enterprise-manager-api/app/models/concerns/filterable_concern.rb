module FilterableConcern
  extend ActiveSupport::Concern

  included do
    scope :this_month, -> { where(created_at: DateTime.now.beginning_of_month..DateTime.now.end_of_month) }

    scope :with_month, -> (month) { 
     where("cast(strftime('%m', #{self.table_name}.created_at) as int) = ?", month)
    }

    scope :with_year, -> (year) { 
      where("cast(strftime('%Y', #{self.table_name}.created_at) as int) = ?", year)
    }

    scope :with_date_range, -> (from_date, to_date) { where(created_at: from_date..to_date)} 

    scope :with_date, -> (date) { where(created_at: date) }
  end

  module ClassMethods
     

    def with_filters(filtering_params)
      results = self.where(nil)
      filtering_params.each do |key, value|
        results = results.public_send("with_#{key}", value) if value.present?
      end
      results
    end
  end
end