const INITIAL_STATE = {providerProducts : [] , loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProviderProducts':
            return {
                providerProducts: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
