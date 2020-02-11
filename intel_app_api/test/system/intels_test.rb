require "application_system_test_case"

class IntelsTest < ApplicationSystemTestCase
  setup do
    @intel = intels(:one)
  end

  test "visiting the index" do
    visit intels_url
    assert_selector "h1", text: "Intels"
  end

  test "creating a Intel" do
    visit intels_url
    click_on "New Intel"

    fill_in "Contact", with: @intel.contact_id
    fill_in "Content", with: @intel.content
    fill_in "Date", with: @intel.date
    fill_in "Remarks", with: @intel.remarks
    fill_in "Source", with: @intel.source
    fill_in "Tags", with: @intel.tags
    fill_in "Title", with: @intel.title
    fill_in "Category", with: @intel.category
    fill_in "User", with: @intel.user_id
    click_on "Create Intel"

    assert_text "Intel was successfully created"
    click_on "Back"
  end

  test "updating a Intel" do
    visit intels_url
    click_on "Edit", match: :first

    fill_in "Contact", with: @intel.contact_id
    fill_in "Content", with: @intel.content
    fill_in "Date", with: @intel.date
    fill_in "Remarks", with: @intel.remarks
    fill_in "Source", with: @intel.source
    fill_in "Tags", with: @intel.tags
    fill_in "Title", with: @intel.title
    fill_in "Category", with: @intel.category
    fill_in "User", with: @intel.user_id
    click_on "Update Intel"

    assert_text "Intel was successfully updated"
    click_on "Back"
  end

  test "destroying a Intel" do
    visit intels_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Intel was successfully destroyed"
  end
end
