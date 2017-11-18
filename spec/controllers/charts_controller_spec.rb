require 'rails_helper'

RSpec.describe ChartsController, type: :controller do

  describe 'it produces all the lizards' do
    it 'returns the count equal to all lizards in the database' do
    @lizards = Lizard.all
    @count= Lizard.count
    expect(@lizards.count).to eq(@count)
    end
  end
end
