json.id "c#{@message.messageable_id}"
json.message do
    json.partial! "/api/messages/message", message: @message
end

json.users do
    json.set! @message.author_id do
        json.extract @message.author, :id, :username
    end
end