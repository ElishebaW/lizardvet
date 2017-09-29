class AddProfilePicToVeterinarians < ActiveRecord::Migration
  def change
    add_column :veterinarians, :profile_pic, :image
  end
end
