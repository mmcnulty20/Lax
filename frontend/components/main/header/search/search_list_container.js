import { connect } from "react-redux";
import SearchbarList from "./searchbar_list";
import { searchChannels } from "../../../../actions/channel_actions";
import { withRouter } from "react-router-dom";
import pick from "lodash/pick"

const mapStateToProps = ({ entities: { channels: { search } } }) => {
    // search = search ? search.filter( c => c.member || !c.isPrivate ) : []
    search = search ? search.filter( c => c.member || !c.isPrivate ) : []
    return {
        search,
    }
}

const mapDispatchToProps = dispatch => (
    {
        searchChannels: () => dispatch(searchChannels())
    }
)



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchbarList));