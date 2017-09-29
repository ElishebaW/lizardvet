class CreateVeterinarians < ActiveRecord::Migration
  def change
    create_table :veterinarians do |t|
      t.string :first_name
      t.string :last_name
      t.integer :years_in_practice
      t.string :vet_university

      t.timestamps null: false
    end
  end
end
