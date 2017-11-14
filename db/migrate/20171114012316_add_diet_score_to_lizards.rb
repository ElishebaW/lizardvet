class AddDietScoreToLizards < ActiveRecord::Migration
  def change
    add_column :lizards, :diet_score, :integer
  end
end
