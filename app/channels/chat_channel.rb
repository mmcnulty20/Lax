class ChatChannel < ApplicationCable::Channel
    def subscribed
      # stream_from "some_channel"
        stream_for "chat_channel"
    end 

    def speak(data)
        # debugger
        message = Message.create(body: data["message"], author_id: 40, messageable_type: "Channel", messageable_id: 13)
        socket = { message: { id: message.id, author_id: message.author_id, body: message.body, created_at: message.created_at, edited: false } }
        # debugger
        ChatChannel.broadcast_to("chat_channel", socket)
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
end
