import * as DMApiUtil from "../utils/dm_api_utils";


export const RECEIVE_DM = "RECEIVE_DM";
export const REMOVE_DM = "REMOVE_DM";


export const receiveDM = dm => (
    {
        ...dm,
        type: RECEIVE_DM,
    }
)


const removeDM = dm_id => (
    {
        type: REMOVE_DM,
        dm_id
    }
)


export const fetchDM = id => (
    dispatch => DMApiUtil.fetchDM(id).then(
        res => dispatch(receiveDM(res))
    )
)

export const createDM = info => (
    dispatch => DMApiUtil.createDM(info).then(
        res => dispatch(receiveDM(res))
    )
)

export const deleteDM = id => (
    dispatch => DMApiUtil.deleteDM(id).then(
        () => dispatch(removeDM(id))
    )
)