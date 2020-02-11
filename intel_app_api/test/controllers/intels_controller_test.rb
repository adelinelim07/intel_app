require 'test_helper'

class IntelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @intel = intels(:one)
  end

  test "should get index" do
    get intels_url
    assert_response :success
  end

  test "should get new" do
    get new_intel_url
    assert_response :success
  end

  test "should create intel" do
    assert_difference('Intel.count') do
      post intels_url, params: { intel: { contact_id: @intel.contact_id, content: @intel.content, date: @intel.date, remarks: @intel.remarks, source: @intel.source, tags: @intel.tags, title: @intel.title, category: @intel.category, user_id: @intel.user_id } }
    end

    assert_redirected_to intel_url(Intel.last)
  end

  test "should show intel" do
    get intel_url(@intel)
    assert_response :success
  end

  test "should get edit" do
    get edit_intel_url(@intel)
    assert_response :success
  end

  test "should update intel" do
    patch intel_url(@intel), params: { intel: { contact_id: @intel.contact_id, content: @intel.content, date: @intel.date, remarks: @intel.remarks, source: @intel.source, tags: @intel.tags, title: @intel.title, category: @intel.category, user_id: @intel.user_id } }
    assert_redirected_to intel_url(@intel)
  end

  test "should destroy intel" do
    assert_difference('Intel.count', -1) do
      delete intel_url(@intel)
    end

    assert_redirected_to intels_url
  end
end
