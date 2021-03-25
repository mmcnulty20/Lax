export const checkSubbed = (id) => (
    App.cable.subscriptions.subscriptions.find( ( sub ) => {
        const parsed = JSON.parse( sub.identifier )
        return parsed.channel_id === id || parsed.dm_id === id
    })
)

export const memberSub = ({ receiveChannel, receiveDM}) => {
    App.cable.subscriptions.create(
        { channel: "MembershipsChannel" },
            {
                received: ({ action, type, info }) => {
                    if (type === "Channel") {
                        switch (action) {
                            case "join":
                                receiveChannel(info)
                                break
                            case "newMember":
                            case "leave":
                            case "delete":
                            default:
                                break;
                        }
                    } else if ( type === "DirectMessage" ) {
                        switch (action) {
                            case "new":
                                receiveDM(info)
                            case "delete":
                            default:
                                break;
                        }
    
                    }
                }
            }
    )
}