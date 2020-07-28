class DateFieldOption < ApplicationRecord

  belongs_to :field, touch: true
  enum fill_with: [:user_input, :todays_date, :x_time_from_x_time, :first_each_month, :fifteenth_each_month, :first_next_month, :fifteenth_next_month, :end_of_month, :end_of_next_month]
  enum chosen_time: [:months, :days, :years, :hours, :minutes]
  enum from_time: [:now, :zoho_creation_date, :custom_date, :next_month]
  enum date_format: ["MM/DD/YYYY"]
  
  validates :time_length, presence: true, if: -> { fill_with == "x_time_from_x_time"}
  validates :chosen_time, presence: true, if: -> { fill_with == "x_time_from_x_time"}
  validates :from_time, presence: true, if: -> { fill_with == "x_time_from_x_time"}
  validates :custom_date, presence: true, if: -> { from_time == "custom_date"}
end
