class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(user_params[:email], user_params[:password])
        if @user
            login!(@user)
            render "api/users/user_stub"
        else
            render json: ["Sorry, you entered an incorrect email address or password."], status: 401
        end
    end

    def destroy
        if current_user
            logout!
            render json: {}
        else
            render json: ["User doesn't exist!"], status: 404
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
