require 'test_helper'

class PagePermissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @page_permission = page_permissions(:one)
  end

  test "should get index" do
    get page_permissions_url, as: :json
    assert_response :success
  end

  test "should create page_permission" do
    assert_difference('PagePermission.count') do
      post page_permissions_url, params: { page_permission: { organization_id: @page_permission.organization_id, page_name: @page_permission.page_name, role_id: @page_permission.role_id } }, as: :json
    end

    assert_response 201
  end

  test "should show page_permission" do
    get page_permission_url(@page_permission), as: :json
    assert_response :success
  end

  test "should update page_permission" do
    patch page_permission_url(@page_permission), params: { page_permission: { organization_id: @page_permission.organization_id, page_name: @page_permission.page_name, role_id: @page_permission.role_id } }, as: :json
    assert_response 200
  end

  test "should destroy page_permission" do
    assert_difference('PagePermission.count', -1) do
      delete page_permission_url(@page_permission), as: :json
    end

    assert_response 204
  end
end
