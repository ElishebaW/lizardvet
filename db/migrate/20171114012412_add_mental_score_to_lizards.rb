class AddMentalScoreToLizards < ActiveRecord::Migration[4.2]
  def change
    add_column :lizards, :mental_score, :integer
  end
end
