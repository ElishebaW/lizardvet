require 'rails_helper'

RSpec.describe VeterinariansController, type: :controller do
  describe '#new' do
    it 'can add a new lizard' do
      Veterinarian.create
      expect(response.status).to eq(200)
    end
  end

  describe '#edit' do
    it 'can edit a client' do
      @veterinarian =  Veterinarian.create(:first_name => 'William', :last_name => 'Odeton', :years_in_practice => 5, :vet_university => '10/27/2012')
      @veterinarian.years_in_practice = 10
      expect(@veterinarian.years_in_practice).to eq(10)
    end
  end
end
