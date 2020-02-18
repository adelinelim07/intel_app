class Delete < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :unreadCount
  end
end
