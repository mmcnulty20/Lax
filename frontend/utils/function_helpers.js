export const checkSubbed = (id) => (
    App.cable.subscriptions.subscriptions.find( ( sub ) => {
        const parsed = JSON.parse( sub.identifier )
        return parsed.channel_id === id || parsed.dm_id === id
    })
)