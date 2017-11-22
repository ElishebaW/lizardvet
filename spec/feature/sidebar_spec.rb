require "rails_helper"

RSpec.feature "sidebar navigation", :type => :feature do

  it 'goes to the root page' do
    visit '/'
  end
end

  # it "clicks the clients link on the side bar" do
  #   visit '/'
  #   click_link("Clients")
  #   expect(page).to have_content("Pet Owners")
  # end
