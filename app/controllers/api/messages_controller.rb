class Api::MessagesController < ApplicationController
    def index
        @messages = Message.where( messageable_id: params[:channel_id], messageable_type: "Channel" ).includes(:author)
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
