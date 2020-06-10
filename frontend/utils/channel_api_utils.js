export const fetchAllChannels = () => (
    $.ajax({
        method: "GET",
        url: `/api/channels`
    })
)

export const fetchUserChannels = id => (
    $.ajax({
        method: "GET",
        url: `/api/users/${id}/channels`
    })
)

export const fetchChannel = id => (
    $.ajax({
        method: "",
        url: `/api/channels/${id}`
    })
)

export const createChannel = channel => (
    $.ajax({
        method: "POST",
        url: `/api/channels`,
        data: { channel }
    })
)

export const editChannel = channel => (
    $.ajax({
        method: "PATCH",
        url: `/api/channels/${channel.id}`,
        data: { channel }
    })
)

export const deleteChannel = id => (
    $.ajax({
        method: "DELETE",
        url: `/api/channels/${id}`
    })
)

export const checkName = name => (
    $.ajax({
        method: "GET",
        url: `/api/channels/already_taken/?channel[name]=${ name }`,
    })
)

export const addChannelMembers = (channelId, user_ids) => (
    $.ajax({
        method: "POST",
        url: `/api/channels/${channelId}/memberships`,
        data: { members: { user_ids } }
    })
)

export const searchChannels = () => (
    $.ajax({
        method: "GET",
        url: `/api/channels/?channel[search]=true`
    })
)