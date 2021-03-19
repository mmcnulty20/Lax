export const createSubscription = (type, id) => {
    let toSubscribe = type === "Channel" ? { channel_id: id } : { dm_id: id }
    App.cable.subscriptions.create(
        { channel: "ChatChannel", ...toSubscribe },
        {
            received: data => {
                if (data.message.type === "delete") {
                    let messages = this.state.messages.filter(m => m.id !== data.message.id)
                    this.setState({ messages })
                } else if (data.message.edited === false) {
                    this.setState({
                        messages: [...this.state.messages, data.message]
                    })
                } else if (data.message.edited === true) {
                    let messages = this.state.messages.map((m, i) => {
                        return m.id === data.message.id ?
                            data.message :
                            m
                    })
                    this.setState({ messages })
                }
            },
            speak: function (data) {
                return this.perform("speak", data);
            }
        }
    )
    if (App.cable.subscriptions.subscriptions.length > 1) App.cable.subscriptions.subscriptions.shift()
}