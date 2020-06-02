import * as SessionAPIUtil from "../utils/session_api_utils";

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER_DETAILS = "RECEIVE_USER_DETAILS";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveAllUsers = users => (
    {
        type: RECEIVE_ALL_USERS,
        users,
    }
)

const receiveUserDetails = user => (
    {
        type: RECEIVE_USER_DETAILS,
        user,
    }
)

const removeUser = userId => (
    {
        type: RECEIVE_CURRENT_USER,
        userId,
    }
)

const receiveCurrentUser = user => (
    {
        type: RECEIVE_CURRENT_USER,
        user,
    }
)

const logoutCurrentUser = () => (
    {
        type: LOGOUT_CURRENT_USER,
    }
)

const receiveSessionErrors = ({responseJSON}) => (
    {
        type: RECEIVE_SESSION_ERRORS,
        errors: responseJSON,
    }
)

export const retrieveAllUsers = () => {
    return dispatch => SessionAPIUtil.fetchUsers().then(res => {
        return dispatch(receiveAllUsers(res))
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}

export const retrieveUserDetails = userId => {
    return dispatch => SessionAPIUtil.fetchUser(userId).then(res => {
        return dispatch(receiveUserDetails(res))
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}

export const updateUser = user => {
    return dispatch => SessionAPIUtil.updateUser(user).then(res => {
        return dispatch(receiveCurrentUser(res))
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}

export const deleteUser = userId => {
    return dispatch => SessionAPIUtil.deleteUser(userId).then(() => {
        return dispatch(removeUser(userId))
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}

export const loginUser = user => {
    return dispatch => SessionAPIUtil.loginUser(user).then(res => {
        return dispatch(receiveCurrentUser(res))
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}

export const signupUser = user => {
    return dispatch => SessionAPIUtil.signupUser(user).then(res => {
        return dispatch(receiveCurrentUser(res))
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}

export const logoutUser = () => {
    return dispatch => SessionAPIUtil.logoutUser().then(() => {
        return dispatch(logoutCurrentUser())
    }, errors => {
        return dispatch(receiveSessionErrors(errors))
    })
}