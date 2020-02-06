class IntelsController < ApplicationController
  before_action :set_intel, only: [:show, :edit, :update, :destroy]

  # GET /intels
  # GET /intels.json
  def index
    @intels = Intel.all.reverse
    render json: @intels
  end

  # GET /intels/1
  # GET /intels/1.json
  def show
  end

  # GET /intels/new
  def new
    @intel = Intel.new
  end

  # GET /intels/1/edit
  def edit
  end

  # POST /intels
  # POST /intels.json
  def create
    @intel = Intel.new(intel_params)

    if @intel.save
      render json: @intel, status: :created, location: @intel
    else
      render json: @intel.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /intels/1
  # PATCH/PUT /intels/1.json
  def update
    respond_to do |format|
      if @intel.update(intel_params)
        format.html { redirect_to @intel, notice: 'Intel was successfully updated.' }
        format.json { render :show, status: :ok, location: @intel }
      else
        format.html { render :edit }
        format.json { render json: @intel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /intels/1
  # DELETE /intels/1.json
  def destroy
    @intel.destroy
    respond_to do |format|
      format.html { redirect_to intels_url, notice: 'Intel was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_intel
      @intel = Intel.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def intel_params
      #params.require(:intel).permit(:title)
      params.require(:intel).permit(:title, :content, :source, :tags, :contact_id, :user_id, :type, :remarks, :date)
    end
end
