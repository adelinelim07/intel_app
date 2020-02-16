require 'test_helper'

class IntelCompaniesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @intel_company = intel_companies(:one)
  end

  test "should get index" do
    get intel_companies_url
    assert_response :success
  end

  test "should get new" do
    get new_intel_company_url
    assert_response :success
  end

  test "should create intel_company" do
    assert_difference('IntelCompany.count') do
      post intel_companies_url, params: { intel_company: { company_id: @intel_company.company_id, intel_id: @intel_company.intel_id, qty: @intel_company.qty } }
    end

    assert_redirected_to intel_company_url(IntelCompany.last)
  end

  test "should show intel_company" do
    get intel_company_url(@intel_company)
    assert_response :success
  end

  test "should get edit" do
    get edit_intel_company_url(@intel_company)
    assert_response :success
  end

  test "should update intel_company" do
    patch intel_company_url(@intel_company), params: { intel_company: { company_id: @intel_company.company_id, intel_id: @intel_company.intel_id, qty: @intel_company.qty } }
    assert_redirected_to intel_company_url(@intel_company)
  end

  test "should destroy intel_company" do
    assert_difference('IntelCompany.count', -1) do
      delete intel_company_url(@intel_company)
    end

    assert_redirected_to intel_companies_url
  end
end
