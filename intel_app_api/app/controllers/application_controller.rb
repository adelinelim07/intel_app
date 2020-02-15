class ApplicationController < ActionController::Base

    # include ::ActionController::Cookies

    # def authenticate_user
    #   jwt = cookies.signed[:jwt]
    #   decode_jwt(jwt)
    # end

    # def issue_token payload
    #   JWT.encode(payload, Rails.application.secrets.secret_key_base,
    #   "HS256")
    # end

    # def decoded_token
    #   if request.headers['Authorization']
    #     begin
    #       JWT.decode(request.headers['Authorization'],
    #       Rails.application.secrets.secret_key_base, true, 
    #       {algorithm: "HS256"})
    #     rescue JWT::DecodeError
    #        return [{}]
    #     end
    #    else
    #      [{}]
    #    end
    # end

    skip_before_action :verify_authenticity_token

    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
  
    def login!
      session[:user_id] = @user.id
    end
  
    def logged_in?
      !!session[:user_id]
    end
  
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
  
    def authorized_user?
       @user == current_user
     end
  
     def logout!
       session.clear
     end


end
