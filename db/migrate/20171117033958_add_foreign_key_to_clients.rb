class AddForeignKeyToClients < ActiveRecord::Migration
  def change  
    add_reference :clients, :lizards, index: true, foreign_key: true
  end
end
