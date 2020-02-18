class ApplicationController < ActionController::Base

  # def not_found
  #   render json: { error: 'not_found' }
  # end

  # def authorize_request
  #   header = request.headers['Authorization']
  #   header = header.split(' ').last if header
  #   begin
  #     @decoded = JsonWebToken.decode(header)
  #     @current_user = User.find(@decoded[:user_id])
  #   rescue ActiveRecord::RecordNotFound => e
  #     render json: { errors: e.message }, status: :unauthorized
  #   rescue JWT::DecodeError => e
  #     render json: { errors: e.message }, status: :unauthorized
  #   end
  

  skip_before_action :verify_authenticity_token

    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
  
    def login!
      session[:username] = @user.username
    end
  
    def logged_in?
      !!session[:user_id]
    end
  
    def current_user
      @current_user ||= User.find(session[:username]) if session[:username]
    end
  
    def authorized_user?
       @user == current_user
     end
  
     def logout!
       session.clear
     end


end
