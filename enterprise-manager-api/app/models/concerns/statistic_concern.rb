module StatisticConcern
  extend ActiveSupport::Concern

  def date_parsed
    current_offset = Time.now.zone
    DateTime.parse("#{created_at}").new_offset(current_offset)
  end
  
  included do

    scope :group_monthly, -> { group_by { |m| m.date_parsed.beginning_of_month } }
    scope :group_by_date, -> { group_by { |m| m.date_parsed.to_date } }
    scope :group_hourly, -> { group_by { |m| m.date_parsed.hour } }
  end

end