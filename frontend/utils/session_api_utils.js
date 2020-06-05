export const fetchUsers = () => (
    $.ajax({
        method: "GET",
        url: `/api/users`
    })
)

export const fetchUser = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}`,
    })
)

export const signupUser = user => (
    $.ajax({
        method: "POST",
        url: `/api/users`,
        data: { user }
    })
)

export const updateUser = user => (
    $.ajax({
        method: "PATCH",
        url: `/api/users/${user.id}`,
        data: { user }
    })
)

export const deleteUser = userId => (
    $.ajax({
        method: "DELETE",
        url: `/api/users/${userId}`,
    })
)

export const loginUser = user => (
    $.ajax({
        method: "POST",
        url: `/api/session`,
        data: { user }
    })
)

export const logoutUser = () => (
    $.ajax({
        method: "DELETE",
        url: `/api/session`,
    })
)

export const checkEmail = email => (
    $.ajax({
        method: "GET",
        url: `/api/users/email_in_use/?user[email]=${ email }`
    })
)