class Api::MessagesController < ApplicationController
    def index
        if params[:channel_id]
            @messages = Message.where( messageable_id: params[:channel_id], messageable_type: "Channel" ).includes(:author)
        else 
            @messages = Message.where( messageable_id: params[:direct_message_id], messageable_type: "DirectMessage" ).includes(:author)
        end
        # @messages = Message.all
    end

    def show
        @message = Message.includes(:author).find(params[:id])
    end

    def create
    end

    def update
    end

    def destroy
    end
end
