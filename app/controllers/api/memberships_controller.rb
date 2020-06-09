class Api::MembershipsController < ApplicationController
    def create
        # NOTE: single user id will still need to be in an array! [:id]
        joined = find_joined
        if joined
            new_members = member_params[:user_ids].map do |id|
                member = User.find(id)
                member ? {
                        user_id: id,
                        joinable_id: joined.id,
                        joinable_type: joined.is_a?(Channel) ? "Channel" : "DM"
                    } : nil
            end
            debugger
            Membership.create!(new_members)
            if joined.is_a?(Channel)
                @channel = joined
                render "api/channels/show"
            else
                @dm = joined
            end
        end
    end

    def find_joined
        return params[:channel_id] ? 
            Channel.find(params[:channel_id]) :
            DM.find(params[:dm_id])
    end

    def destroy
        joined = find_joined
        if joined.members.include?(current_user)
            membership = Membership.find_by(
                user_id: current_user.id,
                joinable_id: joined.id, 
                joinable_type: joined.is_a?(Channel) ? "Channel" : "DM")
            membership.destroy
        end
    end

    private
    def member_params
        params.require(:members).permit(user_ids: [])
    end
end