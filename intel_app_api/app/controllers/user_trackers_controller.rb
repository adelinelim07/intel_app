class UserTrackersController < ApplicationController
  before_action :set_user_tracker, only: [:show, :edit, :update, :destroy]

  # GET /user_trackers
  # GET /user_trackers.json
  def index
    @user_trackers = UserTracker.all
    render json: @user_trackers
  end

  # GET /user_trackers/1
  # GET /user_trackers/1.json
  def show
  end

  # GET /user_trackers/new
  def new
    @user_tracker = UserTracker.new
  end

  # GET /user_trackers/1/edit
  def edit
  end

  # POST /user_trackers
  # POST /user_trackers.json
  def create
    @user_tracker = UserTracker.new(user_tracker_params)

    if @user_tracker.save
      render json: @user_tracker, status: :created, location: @user_tracker
    else
      render json: @user_tracker.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_trackers/1
  # PATCH/PUT /user_trackers/1.json
  def update
    
    if @user_tracker.update(user_tracker_params)
      render json: @user_tracker
    else
      render json: @user_tracker.errors, status: :unprocessable_entity
        
    end
  end

  # DELETE /user_trackers/1
  # DELETE /user_trackers/1.json
  def destroy
    @user_tracker.destroy
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_tracker
      @user_tracker = UserTracker.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_tracker_params
      params.require(:user_tracker).permit(:unreadCount, :user_id)
    end
end
