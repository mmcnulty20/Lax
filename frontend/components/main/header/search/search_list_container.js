import { connect } from "react-redux";
import SearchbarList from "./searchbar_list";
import { fetchAllChannels } from "../../../../actions/channel_actions";
import { withRouter } from "react-router-dom";
import pick from "lodash/pick"

const mapStateToProps = ({ entities: { channels }, session: { currentUserId } }) => {
    channels = Object.values(channels);
    let chArr = [];
    console.log(channels)
    channels.forEach( c => {
        if ( !c.isPrivate || c.members && c.members.includes(currentUserId)) {
            console.log(c)
            console.log(c.members)
            const lessInfo = pick(c, ["id", "name", "isPrivate"])
            console.log(lessInfo)
            if ( c.members ) lessInfo.member = c.members.includes(currentUserId);
            chArr.push(lessInfo);
            console.log(chArr)
        }
    })
    return {
        id: currentUserId,
        channels: chArr
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchAllChannels: () => dispatch(fetchAllChannels())
    }
)



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchbarList));