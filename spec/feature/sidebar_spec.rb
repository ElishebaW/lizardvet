require 'rails_helper'

RSpec.feature 'sidebar navigation', :type => :feature do

  before do
    visit '/'
  end

  it 'clicks the Case Loadlink on the side bar' do
    click_link('Case Load')
    expect(page).to have_content('Case Load')
  end

  it 'clicks the Analytics link on the side bar' do
    click_link('Analytics')
    expect(page).to have_content('Practice Performance Analytics')
  end

  it 'clicks the Clients link on the side bar' do
    click_link('Clients')
    expect(page).to have_content('Pet Owners')
  end

  it 'clicks the Manage Vets link on the side bar' do
    click_link('Manage Vets')
    expect(page).to have_content('Practice Veterinarians')
  end
end
