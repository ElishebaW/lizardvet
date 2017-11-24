class Client < ActiveRecord::Base
  has_many :lizards, dependent: :destroy
end
