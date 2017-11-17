class Client < ActiveRecord::Base
  has_many :lizards, dependent: :destroy

  def pet_name
  pet_name = Client.select("pet_name")
  end
end
