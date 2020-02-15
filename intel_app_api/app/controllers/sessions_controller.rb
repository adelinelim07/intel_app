class SessionsController < ApplicationController
  # before_action :authorize_request, except: :login

    def create
        @user = User.find_by(username: session_params[:username])
      
        if @user && @user.authenticate(session_params[:password])
          login!
          # token = JsonWebToken.encode(user_id: @user.id)
          # time = Time.now + 24.hours.to_i
          render json: {
            # token: token, 
            # exp: time.strftime("%m-%d-%Y %H:%M"),
            logged_in: true,
            user: @user,
          }
        else
          render json: { 
            status: 401,
            errors: ['no such user', 'verify credentials and try again or signup']
          }
        end
      end
    
    
      def is_logged_in?
        if logged_in? && current_user
          render json: {
            logged_in: true,
            user: current_user
          }
        else
          render json: {
            logged_in: false,
            message: 'no such user'
          }
        end
      end
    
      def destroy
        logout!
        render json: {
          status: 200,
          logged_out: true
        }
      end
    
      private
    
      def session_params
        params.require(:user).permit(:username, :password)
      end

      
    end