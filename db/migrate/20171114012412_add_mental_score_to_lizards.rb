class AddMentalScoreToLizards < ActiveRecord::Migration
  def change
    add_column :lizards, :mental_score, :integer
  end
end
