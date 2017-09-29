class LizardsController < ApplicationController
  before_action :set_lizard, only: [:show, :edit, :update, :destroy]

  # GET /lizards
  # GET /lizards.json
  def index
    @lizards = Lizard.all
  end

  # GET /lizards/1
  # GET /lizards/1.json
  def show
  end

  # GET /lizards/new
  def new
    @lizard = Lizard.new
  end

  # GET /lizards/1/edit
  def edit
  end

  # POST /lizards
  # POST /lizards.json
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

  # PATCH/PUT /lizards/1
  # PATCH/PUT /lizards/1.json
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

  # DELETE /lizards/1
  # DELETE /lizards/1.json
  def destroy
    @lizard.destroy
    respond_to do |format|
      format.html { redirect_to lizards_url, notice: 'Lizard was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lizard
      @lizard = Lizard.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lizard_params
      params.require(:lizard).permit(:petname, :weight, :length, :last_seen)
    end
end
