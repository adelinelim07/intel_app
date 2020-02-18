class CreateUserTrackers < ActiveRecord::Migration[6.0]
  def change
    create_table :user_trackers do |t|
      t.integer :unreadCount
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
