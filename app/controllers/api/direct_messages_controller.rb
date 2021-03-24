class Api::DirectMessagesController < ApplicationController

    def show
        @dm = DirectMessage.includes(:members, :messages).find(params[:id])
    end
    
    def create
        @dm = DirectMessage.includes(:members, :messages).group_exists?(dm_params[:user_ids])
        if @dm
            @dm.messages.create(author: current_user, body: dm_params[:body])
            MembershipsChannel.broadcast_to(current_user, format_create)
        else
            DirectMessage.transaction do
                @dm = DirectMessage.create
                @dm.member_ids = dm_params[:user_ids]
                @dm.messages.create(author: current_user, body: dm_params[:body])
            end
            if @dm
                socket = format_create
                @dm.members.each { |member| MembershipsChannel.broadcast_to( member, socket ) }
            else
                render json: ["Cannot create direct message"], status: 401
            end
        end
    end

    
    private
    def format_create
        {
            action: "new",
            type: "DirectMessage",
            info: JSON.parse(render("/api/direct_messages/show.json.jbuilder"))
        }
    end

    def dm_params
        params.require(:dm).permit(:body, user_ids: [])
    end
end
