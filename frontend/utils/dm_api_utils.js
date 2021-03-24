export const fetchDM = id => (
    $.ajax({
        method: `GET`,
        url: `/api/direct_messages/${id}`
    })
)

export const createDM = ({ ids, body }) => (
    $.ajax({
        method: `POST`,
        url: `/api/direct_messages`,
        data: { dm: { user_ids: ids, body } }
    })
)

export const deleteDM = dm_id => (
    $.ajax({
        method: `DELETE`,
        url: `/api/direct_messages/${dm_id}/memberships/?`
    })
)