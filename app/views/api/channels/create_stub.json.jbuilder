json.extract! @channel, :id, :name
json.admin true
json.isPrivate @channel.is_private