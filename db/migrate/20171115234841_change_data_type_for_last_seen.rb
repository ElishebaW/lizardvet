class ChangeDataTypeForLastSeen < ActiveRecord::Migration[4.2]
  def change
    change_column(:lizards, :last_seen, :date)
  end
end
