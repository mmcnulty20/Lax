class Api::DirectMessagesController < ApplicationController

    def show
        @dm = DirectMessage.includes(:members, :messages).find(params[:id])
    end
    
    def create
        DirectMessage.transaction do
            @dm = DirectMessage.create
            users = params[:user_ids].map { |u| {
                user: u, joinable: @dm
            } }
            Membership.create(users)
        end
        if @dm
            render :show
        else
            render json: ["Cannot create direct message"], status: 401
        end
    end

    private
    def dm_params
        params.require(:dm).permit(:user_ids)
    end
end
