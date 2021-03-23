class MembershipsChannel < ApplicationCable::Channel
    def subscribed
        @user = User.find_by(id: params[:id])
        stream_for @user
    end

    # def new_channel(data)
    #     if data['members'].include?(current_user.id)
    #         MembershipChannel.broadcast_to(current_user, data)
    #     end
    # end

    # def new_dm(data)
    #     if data['members'].include?(current_user.id)
    #         MembershipChannel.broadcast_to(current_user, data)
    #     end
    # end

    # def remove_channel(data)
    #     if data['members'].include?(current_user.id)
    #         MembershipChannel.broadcast_to(current_user, data)
    #     end
    # end

    # def remove_dm(data)
    #     if data['members'].include?(current_user.id)
    #         MembershipChannel.broadcast_to(current_user, data)
    #     end
    # end


end