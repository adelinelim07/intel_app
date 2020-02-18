class UsersController < ApplicationController
  # before_action :authorize_request, except: :create
  # before_action :find_user, except: %i[create index]

    def index
        @users = User.all
        if @users
          render json: {
            users: @users
          }
        else
          render json: {
            status: 500,
            errors: ['no users found']
          }
        end
    end

    def show
        @user = User.find(params[:id])
       if @user
          render json: {
            user: @user
          }
        else
          render json: {
            status: 500,
            errors: ['user not found']
          }
        end
      end

    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

      
      def create
        @user = User.new(user_params)
        if @user.save
          login!
          render json: {
            status: :created,
            user: @user
          }
        else 
          render json: {
            status: 500,
            errors: @user.errors.full_messages
          }
        end
      end

    private
      
      def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
      end
      
    end