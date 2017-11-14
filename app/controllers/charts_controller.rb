class ChartsController < ApplicationController
  def index
    @lizards  = Lizard.all
  end
end
