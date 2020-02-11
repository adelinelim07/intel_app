require 'test_helper'

class SuggestedintelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @suggestedintel = suggestedintels(:one)
  end

  test "should get index" do
    get suggestedintels_url
    assert_response :success
  end

  test "should get new" do
    get new_suggestedintel_url
    assert_response :success
  end

  test "should create suggestedintel" do
    assert_difference('Suggestedintel.count') do
      post suggestedintels_url, params: { suggestedintel: { content: @suggestedintel.content, date: @suggestedintel.date, source: @suggestedintel.source, tags: @suggestedintel.tags, title: @suggestedintel.title, category: @suggestedintel.category, user_id: @suggestedintel.user_id } }
    end

    assert_redirected_to suggestedintel_url(Suggestedintel.last)
  end

  test "should show suggestedintel" do
    get suggestedintel_url(@suggestedintel)
    assert_response :success
  end

  test "should get edit" do
    get edit_suggestedintel_url(@suggestedintel)
    assert_response :success
  end

  test "should update suggestedintel" do
    patch suggestedintel_url(@suggestedintel), params: { suggestedintel: { content: @suggestedintel.content, date: @suggestedintel.date, source: @suggestedintel.source, tags: @suggestedintel.tags, title: @suggestedintel.title, category: @suggestedintel.category, user_id: @suggestedintel.user_id } }
    assert_redirected_to suggestedintel_url(@suggestedintel)
  end

  test "should destroy suggestedintel" do
    assert_difference('Suggestedintel.count', -1) do
      delete suggestedintel_url(@suggestedintel)
    end

    assert_redirected_to suggestedintels_url
  end
end
