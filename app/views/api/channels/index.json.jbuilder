json.channels do
    @channels_and_dms[:channels].each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name
            json.admin ( channel.admin_id == current_user.id)
            json.isPrivate channel.is_private
        end
    end
end

json.dms do
    @channels_and_dms[:dms].each do |dm|
        json.set! dm.id do
            json.extract! dm, :id
            json.members dm.member_ids
        end
    end
end

