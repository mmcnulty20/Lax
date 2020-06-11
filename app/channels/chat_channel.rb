class ChatChannel < ApplicationCable::Channel
    def subscribed
      # stream_from "some_channel"
        stream_for "chat_channel"
    end 

    def speak(data)
        # debugger
        message = Message.create(body: data["message"]["body"], author_id: data["message"]["authorId"], messageable_type: "Channel", messageable_id: data["message"]["channelId"] )
        socket = { message: {
            id: message.id,
            author_id: message.author_id,
            body: message.body,
            created_at: message.created_at,
            edited: false,
            channelId: message.messageable_id,
            username: message.author.username
        } }
        # debugger
        ChatChannel.broadcast_to("chat_channel", socket)
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
end
