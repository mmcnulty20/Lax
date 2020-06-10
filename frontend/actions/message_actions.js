import * as MessageAPIUtil from "../utils/message_api_utils";

export const RECEIVE_CHANNEL_MESSAGES = "RECEIVE_CHANNEL_MESSAGES"
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"

const receiveChannelMessages = ({ messages, id }) => (
    {
        type: RECEIVE_CHANNEL_MESSAGES,
        messages,
        id,
    }
)

const receiveMessage = ({ message, id }) => (
    {
        type: RECEIVE_MESSAGE,
        message,
        id,
    }
)

export const fetchChannelMessages = channelId => {
    return dispatch => MessageAPIUtil.fetchChannelMessages(channelId).then(
        res => dispatch(receiveChannelMessages(res))
    )
}

export const fetchNewMessage = id => {
    return dispatch => MessageAPIUtil.fetchNewMessage(id).then(
        res => dispatch(receiveChannelMessages(res))
    )
}