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
        create_params = { 
            admin_id: current_user.id,
            is_private: channel_params[:isPrivate],
            name: channel_params[:name],
            topic: channel_params[:topic].empty? ? "Add a topic." : channel_params[:topic]
        }
        @channel = Channel.new(create_params)
        if @channel.save
            Membership.create(user_id: current_user.id, joinable_type: "Channel", joinable_id: @channel.id)
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
        if channel && current_user.id == channel.admin_id
            channel.destroy
        end
    end

    def already_taken
        existing = Channel.find_by(name: channel_params[:name]) || User.find_by(username: channel_params[:name])
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :topic, :isPrivate)
    end
end
