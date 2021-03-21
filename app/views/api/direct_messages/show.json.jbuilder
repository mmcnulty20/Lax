json.dm do 
    json.set! @dm.id do 
        json.extract! @dm, :id
        json.members @dm.member_ids
    end
end

json.id "d#{@dm.id}"

json.users do
    @dm.members.each do  |member|
        json.set! member.id do
            json.partial! "/api/users/user", user: member
        end
    end
end

json.messages do
    @dm.messages.each do |message|
        json.set! message.id do
            json.partial! "/api/messages/message", message: message
        end
    end
end