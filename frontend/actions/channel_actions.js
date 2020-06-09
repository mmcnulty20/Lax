import * as ChannelAPIUtil from "../utils/channel_api_utils";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS"
export const RECEIVE_NAME_BOOL = "RECEIVE_NAME_BOOL";

const receiveChannels = channels => (
    {
        type: RECEIVE_CHANNELS,
        channels,
    }
)

const receiveChannel = channel => (
    {
        type: RECEIVE_CHANNEL,
        channel,
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
        res => dispatch(receiveChannel(res)),
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

export const addChannelMembers = userIds => {
    return dispatch => ChannelAPIUtil.addChannelMembers(userIds).then(
        res => dispatch(receiveChannel(res))
    )
}