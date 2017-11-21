class AddForeignKeyToClients < ActiveRecord::Migration[4.2]
  def change
    add_reference :clients, :lizards, index: true, foreign_key: true
  end
end
