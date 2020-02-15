class AddUnreadToIntels < ActiveRecord::Migration[6.0]
  def change
    add_column :intels, :unread, :integer
  end
end
