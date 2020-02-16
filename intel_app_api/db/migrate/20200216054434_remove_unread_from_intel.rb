class RemoveUnreadFromIntel < ActiveRecord::Migration[6.0]
  def change
    remove_column :intels, :unread
  end
end
