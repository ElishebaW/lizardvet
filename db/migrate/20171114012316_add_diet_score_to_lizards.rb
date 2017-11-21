class AddDietScoreToLizards < ActiveRecord::Migration[4.2]
  def change
    add_column :lizards, :diet_score, :integer
  end
end
