class ChangeDataTypeForLastSeen < ActiveRecord::Migration
  def change
    change_column(:lizards, :last_seen, :date)
  end
end
