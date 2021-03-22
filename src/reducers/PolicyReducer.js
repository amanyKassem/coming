const INITIAL_STATE = { policy : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getPolicy':
            return {
                policy: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
