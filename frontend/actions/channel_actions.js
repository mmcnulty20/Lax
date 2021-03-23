import * as ChannelAPIUtil from "../utils/channel_api_utils";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_NEW_CHANNEL = "RECEIVE_NEW_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS"
export const RECEIVE_NAME_BOOL = "RECEIVE_NAME_BOOL";
export const RECEIVE_CHANNEL_SEARCH = "RECEIVE_CHANNEL_SEARCH"

const receiveChannels = ({channels, dms, users}) => (
    {
        type: RECEIVE_CHANNELS,
        channels,
        dms,
        users
    }
)

export const receiveChannel = channel => (
    {
        ...channel,
        type: RECEIVE_CHANNEL,
    }
)

const removeChannel = channel_id => (
    {
        type: REMOVE_CHANNEL,
        channel_id
    }
)

const receiveChannelErrors = ({ responseJSON }) => (
    {
        type: RECEIVE_CHANNEL_ERRORS,
        errors: responseJSON,
    }
)

const receiveNameBool = bool => (
    {
        type: RECEIVE_NAME_BOOL,
        bool
    }
)

const receiveChannelSearch = results => (
    {
        type: RECEIVE_CHANNEL_SEARCH,
        results,
    }
)

const receiveNewChannel = channel => (
    {
        type: RECEIVE_NEW_CHANNEL,
        ...channel
    }
)

export const fetchAllChannels = () => {
    return dispatch => ChannelAPIUtil.fetchAllChannels().then(
        res => dispatch(receiveChannels(res)),
        res => receiveChannelErrors(res)
    )
}

export const fetchUserChannels = id => {
    return dispatch => ChannelAPIUtil.fetchUserChannels(id).then(
        res => dispatch(receiveChannels(res)),
        res => receiveChannelErrors(res)
    )
}

export const fetchChannel = id => {
    return dispatch => ChannelAPIUtil.fetchChannel(id).then(
        res => dispatch(receiveChannel(res)),
        res => receiveChannelErrors(res)
    )
}

export const createChannel = channel => {
    return dispatch => ChannelAPIUtil.createChannel(channel).then(
        res => dispatch(receiveNewChannel(res)),
        res => receiveChannelErrors(res)
    )
}

export const editChannel = channel => {
    return dispatch => ChannelAPIUtil.editChannel(channel).then(
        res => dispatch(receiveChannel(res)),
        res => receiveChannelErrors(res)
    )
}

export const deleteChannel = id => {
    return dispatch => ChannelAPIUtil.deleteChannel(id).then(
        () => dispatch(removeChannel(id)),
        res => receiveChannelErrors(res)
    )
}

export const checkName = name => {
    return dispatch => ChannelAPIUtil.checkName(name).then( ({ inUse }) => {
        return dispatch(receiveNameBool(inUse))
    })
}

export const addChannelMembers = (channel, userIds) => {
    return dispatch => ChannelAPIUtil.addChannelMembers(channel, userIds).then(
        res => dispatch(receiveChannel(res))
    )
}

export const searchChannels = () => {
    return dispatch => ChannelAPIUtil.searchChannels().then(
        res => dispatch(receiveChannelSearch(res)),
        res => receiveChannelErrors(res)
    )
}