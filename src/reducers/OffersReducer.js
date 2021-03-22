const INITIAL_STATE = {offers : [] , offerProvider : [] , loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOffers':
            return {
                offers: action.payload.data,
                loader: action.payload.success
            };
        case 'getOfferProvider':
            return {
                offerProvider: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
