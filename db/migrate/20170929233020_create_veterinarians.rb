class CreateVeterinarians < ActiveRecord::Migration[4.2]
  def change
    create_table :veterinarians do |t|
      t.string :first_name
      t.string :last_name
      t.integer :years_in_practice
      t.string :vet_university
      t.string :avatar

      t.timestamps null: false
    end
  end
end
