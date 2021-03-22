const INITIAL_STATE = {specialOrders : [] , orders : []  , delegateOrders : [] , orderDetails:null , specialOrderDetails:null , loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSpecialOrders':
            return {
                specialOrders: action.payload.data,
                loader: action.payload.success
            };
        case 'getOrders':
            return {
                orders: action.payload.data,
                loader: action.payload.success
            };
        case 'getOrderDetails':
            return {
                orderDetails: action.payload.data,
                loader: action.payload.success
            };
        case 'getSpecialOrderDetails':
            return {
                specialOrderDetails: action.payload.data,
                loader: action.payload.success
            };
        case 'getDelegateOrders':
            return {
                delegateOrders: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
