module FieldConcern
  extend ActiveSupport::Concern

  def format(values)
    case field_format
    when "all_underscored"
      values.join("_").gsub(/[ ]+/, "_")
    when "all_dashed"
      values.join("-").gsub(/[ ]+/, "-")
    when "dashed_upper"
      values.join("-").gsub(/[ ]+/, "-").upcase
    when "underscored_upper"
      values.join("_").gsub(/[ ]+/, "_").upcase
    when "dashed_lower"
      values.join("-").gsub(/[ ]+/, "-").downcase
    when "underscored_lower"
      values.join("_").gsub(/[ ]+/, "_").downcase
    when "all_spaced_upper"
      values.join(" ").upcase
    when "all_spaced_lower"
      values.join(" ").downcase
    when "no_format"
      values.join(" ")
    end
  end

end