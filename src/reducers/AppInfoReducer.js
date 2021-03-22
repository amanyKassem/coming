const INITIAL_STATE = { appInfo : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAppInfo':
            return {
                appInfo: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
