require "application_system_test_case"

class IntelCompaniesTest < ApplicationSystemTestCase
  setup do
    @intel_company = intel_companies(:one)
  end

  test "visiting the index" do
    visit intel_companies_url
    assert_selector "h1", text: "Intel Companies"
  end

  test "creating a Intel company" do
    visit intel_companies_url
    click_on "New Intel Company"

    fill_in "Company", with: @intel_company.company_id
    fill_in "Intel", with: @intel_company.intel_id
    fill_in "Qty", with: @intel_company.qty
    click_on "Create Intel company"

    assert_text "Intel company was successfully created"
    click_on "Back"
  end

  test "updating a Intel company" do
    visit intel_companies_url
    click_on "Edit", match: :first

    fill_in "Company", with: @intel_company.company_id
    fill_in "Intel", with: @intel_company.intel_id
    fill_in "Qty", with: @intel_company.qty
    click_on "Update Intel company"

    assert_text "Intel company was successfully updated"
    click_on "Back"
  end

  test "destroying a Intel company" do
    visit intel_companies_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Intel company was successfully destroyed"
  end
end
