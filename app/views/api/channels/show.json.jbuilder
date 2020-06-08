json.channels do 
    json.set! @channel.id do 
        json.extract! @channel, :id, :name, :topic
        json.admin (@channel.admin_id == current_user.id)
        json.isPrivate @channel.is_private
        json.members ( @channel.members.pluck("id") )
    end
end

json.users do
    @channel.members.each do  |member|
        json.set! member.id do
            json.partial! "/api/users/user", user: member
        end
    end
end
