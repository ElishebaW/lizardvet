class CreateLizards < ActiveRecord::Migration[4.2]
  def change
    create_table :lizards do |t|
      t.string :petname
      t.integer :weight
      t.integer :length
      t.datetime :last_seen

      t.timestamps null: false
    end
  end
end
