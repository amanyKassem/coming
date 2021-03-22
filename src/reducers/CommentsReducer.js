const INITIAL_STATE = { comments : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getComments':
            return {
                comments: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
