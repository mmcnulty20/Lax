import * as MessageAPIUtil from "../utils/message_api_utils";

export const RECEIVE_CHANNEL_MESSAGES = "RECEIVE_CHANNEL_MESSAGES"
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const REMOVE_MESSAGE = "REMOVE_MESSAGE"

const receiveChannelMessages = ({ messages, id, users }) => (
    {
        type: RECEIVE_CHANNEL_MESSAGES,
        messages,
        id,
        users,
    }
)

export const receiveMessage = ({ message, cId }) => (
    {
        type: RECEIVE_MESSAGE,
        message,
        cId,
    }
)

export const removeMessage = ({ id, cId }) => (
    {
        type: REMOVE_MESSAGE,
        id,
        cId
    }
)

export const fetchChannelMessages = channelId => {
    return dispatch => MessageAPIUtil.fetchChannelMessages(channelId).then(
        res => dispatch(receiveChannelMessages(res))
    )
}

export const fetchDirectMessages = dmId => {
    return dispatch => MessageAPIUtil.fetchDirectMessages(dmId).then(
        res => dispatch(receiveChannelMessages(res))
    )
}

export const fetchNewMessage = id => {
    return dispatch => MessageAPIUtil.fetchNewMessage(id).then(
        res => dispatch(receiveChannelMessages(res))
    )
}