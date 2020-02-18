json.extract! user_tracker, :id, :unreadCount, :user_id, :created_at, :updated_at
json.url user_tracker_url(user_tracker, format: :json)
