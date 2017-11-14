class AddSocialScoreToLizards < ActiveRecord::Migration
  def change
    add_column :lizards, :social_score, :integer
  end
end
