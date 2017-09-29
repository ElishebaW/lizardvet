require 'test_helper'

class LizardsControllerTest < ActionController::TestCase
  setup do
    @lizard = lizards(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lizards)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lizard" do
    assert_difference('Lizard.count') do
      post :create, lizard: { last_seen: @lizard.last_seen, length: @lizard.length, petname: @lizard.petname, weight: @lizard.weight }
    end

    assert_redirected_to lizard_path(assigns(:lizard))
  end

  test "should show lizard" do
    get :show, id: @lizard
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lizard
    assert_response :success
  end

  test "should update lizard" do
    patch :update, id: @lizard, lizard: { last_seen: @lizard.last_seen, length: @lizard.length, petname: @lizard.petname, weight: @lizard.weight }
    assert_redirected_to lizard_path(assigns(:lizard))
  end

  test "should destroy lizard" do
    assert_difference('Lizard.count', -1) do
      delete :destroy, id: @lizard
    end

    assert_redirected_to lizards_path
  end
end
