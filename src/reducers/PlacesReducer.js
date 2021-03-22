const INITIAL_STATE = { places : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getPlaces':
            return {
                places: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
