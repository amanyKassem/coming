const INITIAL_STATE = { favourites : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFavourites':
            return {
                favourites: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
