unless @messages.empty?

    json.messages do
        @messages.each do |message|
            json.set! message.id do
                json.partial! "/api/messages/message", message: message
            end
        end
    end

    json.users do 
        @messages.each do |message|
            json.set! message.author_id  do
                json.extract! message.author, :id, :username
            end
        end
    end
    if @messages[0].messageable_type == "Channel"
        json.id "c#{@messages[0].messageable_id}"
    else
        json.id "d#{@messages[0].messageable_id}"
    end

else

    json.set! :messages, {}
    json.set! :users, {}
    json.id nil
    
end