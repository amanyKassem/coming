const INITIAL_STATE = { intro : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getIntro':
            return {
                intro: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
