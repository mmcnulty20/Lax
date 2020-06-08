class Api::ChannelsController < ApplicationController
    def index
        @channels = params[:user_id] ? 
            User.find(current_user.id).joined_channels :
            Channel.all
        render :index
    end

    def show
        @channel = Channel.includes(:members).find(params[:id])
    end
    
    def create
        @channel = Channel.new(channel_params, admin_id: current_user.id)
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: 401
        end
    end
    
    def update
        @channel = Channel.find(params[:id])
        if current_user.id == @channel.admin_id
            if @channel.update
                @channel.includes(:members)
                render :show
            else
                render json: @channel.errors.full_messages, status: 401
            end
        end
    end
    
    def destroy
        channel = Channel.find(params[:id])
        if channel && current_user == channel.admin_id
            channel.destroy
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :topic, :is_private)
    end
end
