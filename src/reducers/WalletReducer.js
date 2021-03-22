const INITIAL_STATE = { wallet : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getWallet':
            return {
                wallet: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
