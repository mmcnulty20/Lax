class ChatChannel < ApplicationCable::Channel
    def subscribed
        if params.has_key?(:channel_id)
            @channel = Channel.find(params[:channel_id][1..-1])
        elsif params.has_key?(:dm_id)
            @channel = DirectMessage.find(params[:dm_id][1..-1])
        end
        stream_for @channel
    end

    def speak(data)
        if data["message"]["edit"]
            message = Message.find(data["message"]["messageId"])
            message.update(body: data["message"]["body"])
            socket = {
                message: {
                    id: message.id,
                    author_id: message.author_id,
                    body: message.body,
                    created_at: message.created_at,
                    edited: true,
                    username: message.author.username
                },
                cId: params[:channel_id] || params[:dm_id], 
                type: "edit"
            }
        elsif data["message"]["delete"]
            message = Message.find(data["message"]["messageId"])
            message.destroy
            socket={ id: message.id, type: "delete", cId: params[:channel_id] || params[:dm_id] }

        else
            message = Message.create(body: data["message"]["body"], author_id: data["message"]["authorId"], messageable: @channel )
            socket = { 
                message: {
                    id: message.id,
                    author_id: message.author_id,
                    body: message.body,
                    created_at: message.created_at,
                    edited: false
                },
                type: "new",
                cId: params[:channel_id] || params[:dm_id], 
                user: {
                    id: message.author_id,
                    username: message.author.username
                }
            }
        end
        ChatChannel.broadcast_to(@channel, socket)
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
end
