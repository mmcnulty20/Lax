@channels_and_dms[:channels].each do |channel|
    json.channels do
        json.set! channel.id do
            json.extract! channel, :id, :name
            json.admin ( channel.admin_id == current_user.id)
            json.isPrivate channel.is_private
        end
    end
    json.users do
        channel.members.each do |member|
            json.set! member.id do
                json.extract! member, :id, :username
            end
        end
    end
end

@channels_and_dms[:dms].each do |dm|
    json.dms do
        json.set! dm.id do
            json.extract! dm, :id
            json.members dm.member_ids
        end
    end
    json.users do
        dm.members.each do |member|
            json.set! member.id do
                json.extract! member, :id, :username
            end
        end
    end
end