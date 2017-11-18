require 'rails_helper'

RSpec.describe ClientsController, type: :controller do
  describe '#new' do
    it 'can add a new client' do
      Client.create
      expect(response.status).to eq(200)
    end
  end

  describe '#edit' do
    it 'can edit a client' do
      @client = Client.create(:first_name => 'Max', :last_name => 'Prentz', :phone_number => '202-555-555', :address => '123 Main Street SE , Washington , DC 202392', lizards_id: 1)
      @client.first_name = 'Mary'
      expect(@client.first_name).to eq('Mary')
    end
  end
end
