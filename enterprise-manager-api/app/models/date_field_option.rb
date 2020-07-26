class DateFieldOption < ApplicationRecord

  belongs_to :field, touch: true
  enum fill_with: [:user_input, :todays_date, :x_time_from_x_time], _default: "user_input"
  enum chosen_time: [:months, :days, :years, :hours, :minutes]
  enum from_time: [:now, :zoho_creation_date, :custom_date]
  enum date_format: ["MM/DD/YYYY"]
  
  validates :time_length, presence: true, if: -> { fill_with == "x_time_from_x_time"}
  validates :chosen_time, presence: true, if: -> { fill_with == "x_time_from_x_time"}
  validates :custom_date, presence: true, if: -> { from_time == "custom_date"}
  before_save :create_date_from_custom_date, if: :custom_date

  def create_date_from_custom_date
    self[:custom_date] = Date.parse(custom_date)
  end

end
