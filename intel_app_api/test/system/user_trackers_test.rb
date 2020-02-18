require "application_system_test_case"

class UserTrackersTest < ApplicationSystemTestCase
  setup do
    @user_tracker = user_trackers(:one)
  end

  test "visiting the index" do
    visit user_trackers_url
    assert_selector "h1", text: "User Trackers"
  end

  test "creating a User tracker" do
    visit user_trackers_url
    click_on "New User Tracker"

    fill_in "Unreadcount", with: @user_tracker.unreadCount
    fill_in "User", with: @user_tracker.user_id
    click_on "Create User tracker"

    assert_text "User tracker was successfully created"
    click_on "Back"
  end

  test "updating a User tracker" do
    visit user_trackers_url
    click_on "Edit", match: :first

    fill_in "Unreadcount", with: @user_tracker.unreadCount
    fill_in "User", with: @user_tracker.user_id
    click_on "Update User tracker"

    assert_text "User tracker was successfully updated"
    click_on "Back"
  end

  test "destroying a User tracker" do
    visit user_trackers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "User tracker was successfully destroyed"
  end
end
