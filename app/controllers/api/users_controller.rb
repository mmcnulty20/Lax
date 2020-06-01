class API::UsersController < ApplicationController
    def index
        
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def update
        if current_user.id == params[:id]
            @user = current_user
            if @user.update(user_params)
                render :show
            else
                render json: @user.errors.full_messages, status: 401
            end
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end
