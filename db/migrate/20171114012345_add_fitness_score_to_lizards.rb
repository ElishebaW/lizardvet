class AddFitnessScoreToLizards < ActiveRecord::Migration[4.2]
  def change
    add_column :lizards, :fitness_score, :integer
  end
end
