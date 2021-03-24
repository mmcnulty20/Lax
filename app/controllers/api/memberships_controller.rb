class Api::MembershipsController < ApplicationController
    def create
        # NOTE: single user id will still need to be in an array! [:id]
        joined = find_joined
        if joined
            new_ids = member_params[:user_ids] - joined.member_ids
            joined.member_ids += new_ids
            socket = format_create
            joined.members.each { |member| MembershipsChannel.broadcast_to(
                member, 
                socket
            )}
        else
            render json: ["Something went wrong"], status: 404
        end
    end

    def format_create
        type = @channel.class.name || @dm.class.name
        { 
            action: "join",
            type: type,
            info: JSON.parse(render("/api/#{type.tableize}/show.json.jbuilder"))
        }
    end

    def find_joined
        if params[:channel_id]
            @channel = Channel.includes(:members, :messages).find_by(id: params[:channel_id])
        else
            @dm = DirectMessage.includes(:members, :messages).find_by(id: params[:direct_message_id])
        end
    end

    def destroy
        joined = find_joined
        if joined.members.include?(current_user)
            membership = Membership.find_by(
                user_id: current_user.id,
                joinable: joined )
            membership.destroy
        end
    end

    private
    def member_params
        params.require(:members).permit(user_ids: [])
    end
end