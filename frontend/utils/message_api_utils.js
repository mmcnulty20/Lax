export const fetchNewMessage = id => (
    $.ajax({
        method: "GET",
        url: `/api/messages/${id}`
    })
)