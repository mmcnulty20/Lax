if @message
    if @message.messageable_type == "Channel"
        json.id "c#{@message.messageable_id}",
    else
        json.id "d#{@message.messageable_id}"
    end
    json.message do
        json.partial! "/api/messages/message", message: @message
    end
    
    json.users do
        json.set! @message.author_id do
            json.extract @message.author, :id, :username
        end
    end

else

    json.id nil
    json.set! :message, {}
    json.set! :users, {}

end