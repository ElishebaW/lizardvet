class AddSocialScoreToLizards < ActiveRecord::Migration[4.2]
  def change
    add_column :lizards, :social_score, :integer
  end
end
