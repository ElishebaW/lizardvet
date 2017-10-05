class HomeController < ApplicationController

  def index
    @veterinarians = Veterinarian.all
  end
end
