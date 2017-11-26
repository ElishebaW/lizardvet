require 'rails_helper'

RSpec.describe 'Charts' , :type =>  :feature do

  before do
    visit '/'
    click_link ('Analytics')
  end

  it 'confirms the charts have loaded' do
    expect(page).to_not have_content('Loading')
  end
end
