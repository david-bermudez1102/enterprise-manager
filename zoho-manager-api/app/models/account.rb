class Account < ApplicationRecord
  belongs_to :accountable, polymorphic: true
end
