export const fetchChannelMessages = channelId => (
    $.ajax({
        method: "GET",
        url: `/api/channels/${channelId}/messages`
    })
)

export const fetchDirectMessages = dmId => (
    $.ajax({
        method: "GET",
        url: `/api/direct_messages/${dmId}/messages`
    })
)

export const fetchNewMessage = id => (
    $.ajax({
        method: "GET",
        url: `/api/messages/${id}`
    })
)