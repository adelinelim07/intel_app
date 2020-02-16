class IntelCompaniesController < ApplicationController
  before_action :set_intelcompany, only: [:show, :edit, :update, :destroy]

  # GET /intelcompanies
  # GET /intelcompanies.json
  def index
    @intelcompanies = IntelCompany.all
    render json: @intelcompanies.to_json(include: [:intel, :company])
  end

  # GET /intelcompanies/1
  # GET /intelcompanies/1.json
  def show
  end

  # GET /intelcompanies/new
  def new
    @intelcompany = IntelCompany.new
  end

  # GET /intelcompanies/1/edit
  def edit
  end

  # POST /intelcompanies
  # POST /intelcompanies.json
  def create
    @intelcompany = IntelCompany.new(intelcompany_params)

    if @intelcompany.save
      render json: @intelcompany, status: :created, location: @intelcompany
    else
      render json: @intelcompany.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /intelcompanies/1
  # PATCH/PUT /intelcompanies/1.json
  def update
    respond_to do |format|
      if @intelcompany.update(intelcompany_params)
        format.html { redirect_to @intelcompany, notice: 'Intel company was successfully updated.' }
        format.json { render :show, status: :ok, location: @intelcompany }
      else
        format.html { render :edit }
        format.json { render json: @intelcompany.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /intelcompanies/1
  # DELETE /intelcompanies/1.json
  def destroy
    @intelcompany.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_intelcompany
      @intelcompany = IntelCompany.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def intelcompany_params
      params.require(:intelcompany).permit(:intel_id, :company_id, :qty)
    end
end
