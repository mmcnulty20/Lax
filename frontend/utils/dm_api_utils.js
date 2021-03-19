export const fetchDM = id => (
    $.ajax({
        method: `GET`,
        url: `/api/direct_messages/${id}`
    })
)

export const createDM = user_ids => (
    $.ajax({
        method: `POST`,
        url: `/api/direct_messages`,
        data: { user_ids }
    })
)

export const deleteDM = dm_id => (
    $.ajax({
        method: `DELETE`,
        url: `/api/direct_messages/${dm_id}/memberships/?`
    })
)