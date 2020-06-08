class Statistic < ApplicationRecord

  def self.records(form)
    form.records.order(:created_at)
  end

  def self.with_last_six_months(form)
    serialized_data(:with_last_six_months) { records(form).group_monthly }
  end

  def self.with_month_year(form, month_year)
    serialized_data(:month_year) { records(form).with_month_year(month_year).group_by_date }
  end

  def self.with_date_range(form, date_range)
    serialized_data(:date_range) { records(form).with_date_range(date_range).group_monthly }
  end

  def self.with_date(form, date)
    serialized_data(:date) { records(form).with_date(date).group_hourly }
  end

  def self.serialized_data(*key)
    serialized_data = {}
    serialized_data[*key] = yield.map do |r, value| 
        {value.first.created_at.iso8601 => value.size} 
    end.reduce Hash.new, :merge
    serialized_data
  end


  def self.with_filters(filtering_params, form)
    if filtering_params.empty?
      with_last_six_months(form)
    else
      results = self
      filtering_params.each do |key, value|
        results = results.public_send("with_#{key}", form, value) if value.present?
      end
      results
    end
  end

end