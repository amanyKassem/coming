const INITIAL_STATE = {product : null , loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProduct':
            return {
                product: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
