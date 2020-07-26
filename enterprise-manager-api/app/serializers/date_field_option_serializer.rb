class DateFieldOptionSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower

  attributes :id, :fill_with, :time_length, :chosen_time, :from_time, :custom_date, :date_format
end
