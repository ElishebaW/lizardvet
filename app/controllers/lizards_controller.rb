class LizardsController < ApplicationController
  before_action :set_lizard, only: [:show, :edit, :update, :destroy]

  def index
    @lizards = Lizard.all
  end

  def show
  end

  def new
    @lizard = Lizard.new
  end

  def edit
  end

  def create
    @lizard = Lizard.new(lizard_params)

    respond_to do |format|
      if @lizard.save
        format.html { redirect_to @lizard, notice: 'Lizard was successfully created.' }
        format.json { render :show, status: :created, location: @lizard }
      else
        format.html { render :new }
        format.json { render json: @lizard.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @lizard.update(lizard_params)
        format.html { redirect_to @lizard, notice: 'Lizard was successfully updated.' }
        format.json { render :show, status: :ok, location: @lizard }
      else
        format.html { render :edit }
        format.json { render json: @lizard.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @lizard.destroy
    respond_to do |format|
      format.html { redirect_to lizards_url, notice: 'Lizard was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

private

  def set_lizard
    @lizard = Lizard.find(params[:id])
  end

  def lizard_params
    params.require(:lizard).permit(:petname, :weight, :length, :social_score, :diet_score, :fitness_score, :mental_score, :last_seen)
  end
end
