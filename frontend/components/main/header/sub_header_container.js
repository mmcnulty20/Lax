import { connect } from "react-redux";
import SubHeader from "./sub_header";
import { fetchChannel } from "../../../actions/channel_actions";

const mapStateToProps = ({ entities }, { location: { pathname: path } }) => {
    const locationDetails = path.slice(0,3) === "/c/" ? 
        entities.channels[path.slice(3)] : ""
    return {
        path,
        locationDetails,
    }
}

const mapDispatchToProps = dispatch => (
    {
        fetchDetails: id => dispatch(fetchChannel(id))
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(SubHeader);