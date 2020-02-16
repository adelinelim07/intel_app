class AddReadbyToIntelandUnreadToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :intels, :readby, :integer, array: true, default: []
    add_column :users, :unreadCount, :integer

  end
end
