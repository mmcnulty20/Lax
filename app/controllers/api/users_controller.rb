class Api::UsersController < ApplicationController
    def index
        @users = User.all
    end

    def show
        @user = User.find(params[:id])
    end

    def create
        @user = User.new(user_params)
        if @user.save
            Membership.create({ user_id: @user.id, joinable_id: Channel.first.id, joinable_type: "Channel" })
            login!(@user)
            render :user_stub
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def update
        if current_user.id == params[:id]
            @user = current_user
            if @user.update(user_params)
                render :user_stub
            else
                render json: @user.errors.full_messages, status: 401
            end
        end
    end

    def destroy
        if current_user.id == params[:id]
            user = User.find[:id].destroy
            session[:session_token] = nil
            current_user = nil
        end
    end

    def email_in_use
        @user = User.find_by(email: user_params[:email])
        render json: { "inUse": !!@user }
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end
