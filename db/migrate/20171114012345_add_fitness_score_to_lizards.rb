class AddFitnessScoreToLizards < ActiveRecord::Migration
  def change
    add_column :lizards, :fitness_score, :integer
  end
end
