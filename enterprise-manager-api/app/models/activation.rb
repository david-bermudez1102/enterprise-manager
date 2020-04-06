class Activation < ApplicationRecord
  belongs_to :account

  def to_param
    :token
  end
end
