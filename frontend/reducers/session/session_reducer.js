const _nullSession = {currentUserId: null};

const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state);
    switch(action.type){
        default:
            return state;
    }
}

export default sessionReducer;