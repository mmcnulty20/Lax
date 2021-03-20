class ChatChannel < ApplicationCable::Channel
    def subscribed
        if params.has_key?(:channel_id)
            @channel = Channel.find(params[:channel_id])
        elsif params.has_key?(:dm_id)
            @channel = DirectMessage.find(params[:dm_id])
        end
        stream_for @channel if @channel
        # stream_for "chat_channel"
    end 

    def speak(data)
        if data["message"]["edit"]
            message = Message.find(data["message"]["messageId"])
            message.update(body: data["message"]["body"])
            socket = { message: {
                id: message.id,
                author_id: message.author_id,
                body: message.body,
                created_at: message.created_at,
                edited: true,
                channelId: message.messageable_id,
                username: message.author.username
            } }

        elsif data["message"]["delete"]
            message = Message.find(data["message"]["messageId"])
            message.destroy
            socket={ message: {
                id: message.id,
                type: "delete"
            } }

        else
            message = Message.create(body: data["message"]["body"], author_id: data["message"]["authorId"], messageable: @channel )
            socket = { message: {
                id: message.id,
                author_id: message.author_id,
                body: message.body,
                created_at: message.created_at,
                edited: false,
                channelId: message.messageable_id,
                username: message.author.username
            } }
        end
        ChatChannel.broadcast_to(@channel, socket)
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
end
