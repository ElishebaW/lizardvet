require 'test_helper'

class VeterinariansControllerTest < ActionController::TestCase
  setup do
    @veterinarian = veterinarians(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:veterinarians)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create veterinarian" do
    assert_difference('Veterinarian.count') do
      post :create, veterinarian: { first_name: @veterinarian.first_name, int: @veterinarian.int, last_name: @veterinarian.last_name, vet_university: @veterinarian.vet_university, years_in_practice: @veterinarian.years_in_practice }
    end

    assert_redirected_to veterinarian_path(assigns(:veterinarian))
  end

  test "should show veterinarian" do
    get :show, id: @veterinarian
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @veterinarian
    assert_response :success
  end

  test "should update veterinarian" do
    patch :update, id: @veterinarian, veterinarian: { first_name: @veterinarian.first_name, int: @veterinarian.int, last_name: @veterinarian.last_name, vet_university: @veterinarian.vet_university, years_in_practice: @veterinarian.years_in_practice }
    assert_redirected_to veterinarian_path(assigns(:veterinarian))
  end

  test "should destroy veterinarian" do
    assert_difference('Veterinarian.count', -1) do
      delete :destroy, id: @veterinarian
    end

    assert_redirected_to veterinarians_path
  end
end
