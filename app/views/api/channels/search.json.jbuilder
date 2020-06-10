# @channels.each do |channel|
#     json.set! channel.id do
#         json.extract! channel, :id, :name
#         json.isPrivate channel.is_private
#         json.member channel.member_ids.include?(current_user.id)
#     end
# end

json.array! @channels do |channel|
    json.extract! channel, :id, :name
    json.isPrivate channel.is_private
    json.member channel.member_ids.include?(current_user.id)
end