@channels.each do |channel|
    json.set! channel.id do
        json.extract! channel, :id, :name
        json.admin ( channel.admin_id == current_user.id)
        json.isPrivate channel.is_private
    end
end