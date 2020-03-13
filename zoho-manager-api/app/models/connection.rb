class Connection < ApplicationRecord
  belongs_to :integration
  belongs_to :form
end
