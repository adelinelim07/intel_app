require "application_system_test_case"

class SuggestedintelsTest < ApplicationSystemTestCase
  setup do
    @suggestedintel = suggestedintels(:one)
  end

  test "visiting the index" do
    visit suggestedintels_url
    assert_selector "h1", text: "Suggestedintels"
  end

  test "creating a Suggestedintel" do
    visit suggestedintels_url
    click_on "New Suggestedintel"

    fill_in "Content", with: @suggestedintel.content
    fill_in "Date", with: @suggestedintel.date
    fill_in "Source", with: @suggestedintel.source
    fill_in "Tags", with: @suggestedintel.tags
    fill_in "Title", with: @suggestedintel.title
    fill_in "Category", with: @suggestedintel.category
    fill_in "User", with: @suggestedintel.user_id
    click_on "Create Suggestedintel"

    assert_text "Suggestedintel was successfully created"
    click_on "Back"
  end

  test "updating a Suggestedintel" do
    visit suggestedintels_url
    click_on "Edit", match: :first

    fill_in "Content", with: @suggestedintel.content
    fill_in "Date", with: @suggestedintel.date
    fill_in "Source", with: @suggestedintel.source
    fill_in "Tags", with: @suggestedintel.tags
    fill_in "Title", with: @suggestedintel.title
    fill_in "Category", with: @suggestedintel.category
    fill_in "User", with: @suggestedintel.user_id
    click_on "Update Suggestedintel"

    assert_text "Suggestedintel was successfully updated"
    click_on "Back"
  end

  test "destroying a Suggestedintel" do
    visit suggestedintels_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Suggestedintel was successfully destroyed"
  end
end
