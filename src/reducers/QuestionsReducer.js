const INITIAL_STATE = { questions : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getQuestions':
            return {
                questions: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
