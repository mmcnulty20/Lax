json.messages do
    @messages.each do |message|
        json.set! message.id do
            json.partial! "/api/messages/message", message: message
        end
    end
end
json.id "c#{@messages[0].messageable_id}"