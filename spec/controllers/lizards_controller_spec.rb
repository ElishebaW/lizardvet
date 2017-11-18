require 'rails_helper'

RSpec.describe LizardsController, type: :controller do
  describe '#new' do
    it 'can add a new lizard' do
      Lizard.create
      expect(response.status).to eq(200)
    end
  end

  describe '#edit' do
    it 'can edit a client' do
      @lizard = Lizard.create(:petname => 'Spike', :weight => 6, :length => 5, :last_seen => '10/27/2012', :social_score => 1, :diet_score => 5, :fitness_score => 4, :mental_score => 3)
      @lizard.social_score = 4
      expect(@lizard.social_score).to eq(4)
    end
  end
end
