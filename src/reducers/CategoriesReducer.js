const INITIAL_STATE = { categories : [], providers : [] ,  providersEvents : [] ,  providerDetails : null,  events : null, event : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCategories':
            return {
                categories: action.payload.data,
                categoriesExtra: action.payload.extra,
                loader: action.payload.success
            };
        case 'getProviders':
            return {
                providers: action.payload.data,
                loader: action.payload.success
            };
        case 'getProviderDetails':
            return {
                providerDetails: action.payload.data,
                loader: action.payload.success
            };
        case 'getProvidersEvents':
            return {
                providersEvents: action.payload.data,
                loader: action.payload.success
            };
        case 'getEvents':
            return {
                events: action.payload.data,
                loader: action.payload.success
            };
        case 'getEvent':
            return {
                event: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
