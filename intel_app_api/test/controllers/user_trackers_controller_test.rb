require 'test_helper'

class UserTrackersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_tracker = user_trackers(:one)
  end

  test "should get index" do
    get user_trackers_url
    assert_response :success
  end

  test "should get new" do
    get new_user_tracker_url
    assert_response :success
  end

  test "should create user_tracker" do
    assert_difference('UserTracker.count') do
      post user_trackers_url, params: { user_tracker: { unreadCount: @user_tracker.unreadCount, user_id: @user_tracker.user_id } }
    end

    assert_redirected_to user_tracker_url(UserTracker.last)
  end

  test "should show user_tracker" do
    get user_tracker_url(@user_tracker)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_tracker_url(@user_tracker)
    assert_response :success
  end

  test "should update user_tracker" do
    patch user_tracker_url(@user_tracker), params: { user_tracker: { unreadCount: @user_tracker.unreadCount, user_id: @user_tracker.user_id } }
    assert_redirected_to user_tracker_url(@user_tracker)
  end

  test "should destroy user_tracker" do
    assert_difference('UserTracker.count', -1) do
      delete user_tracker_url(@user_tracker)
    end

    assert_redirected_to user_trackers_url
  end
end
