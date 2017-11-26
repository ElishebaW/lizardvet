require 'rails_helper'

RSpec.feature 'sidebar navigation', :type => :feature do

  before do
    visit '/'
  end

  it 'clicks the case load link on the side bar' do
    click_link('Case Load')
    expect(page).to have_content('Case Load')
  end

  it 'clicks the case load link on the side bar' do
    click_link('Analytics')
    expect(page).to have_content('Practice Performance Analytics')
  end

  it 'clicks the clients link on the side bar' do
    click_link('Clients')
    expect(page).to have_content('Pet Owners')
  end

  it 'clicks the clients link on the side bar' 
    click_link('Clients')
    expect(page).to have_content('Pet Owners')
  end
end
