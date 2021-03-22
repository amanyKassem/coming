const INITIAL_STATE = {banks : [] , loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBanks':
            return {
                banks: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
