json.channel do 
    json.set! @channel.id do 
        json.extract! @channel, :id, :name, :topic
        json.admin (@channel.admin_id == current_user.id)
        json.isPrivate @channel.is_private
        json.members ( @channel.member_ids )
    end
end

json.id "c#{@channel.id}"

json.users do
    @channel.members.each do  |member|
        json.set! member.id do
            json.partial! "/api/users/user", user: member
        end
    end
end

json.messages do
    @channel.messages.each do |message|
        json.set! message.id do
            json.partial! "/api/messages/message", message: message
        end
    end
end