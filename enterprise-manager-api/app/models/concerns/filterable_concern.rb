module FilterableConcern
  extend ActiveSupport::Concern

  included do
    scope :with_current_month, -> (current) { where(created_at: Time.now.beginning_of_month.in_time_zone..Time.now.end_of_month.in_time_zone) }

    scope :with_month_year, -> (month_year) { 
      converted_date = DateTime.strptime("#{month_year} #{DateTime.now.zone}","%m/%Y %z")
      where(created_at: converted_date..converted_date.end_of_month.in_time_zone)
    }

    scope :with_date_range, -> (date_range) { 
      date_range = date_range.split("-")
      from_date = DateTime.strptime("#{date_range[0]} #{DateTime.now.zone}","%m/%d/%Y %z")
      to_date = DateTime.strptime("#{date_range[1]} #{DateTime.now.zone}","%m/%d/%Y %z")
      where(created_at: from_date..to_date)
    } 

    scope :with_date, -> (date) {
      converted_date = DateTime.strptime("#{date} #{DateTime.now.zone}","%m/%d/%Y %z")
      where(created_at: converted_date..converted_date.at_end_of_day.in_time_zone) 
    }
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