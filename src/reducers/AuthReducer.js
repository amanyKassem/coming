const INITIAL_STATE = {user: null, isNotify:null , delegateIsAvailable:null , loading: false, message: '' , success:false };

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case ('login_user') :
			return ({...state, loading: true});
		case ('login_failed') :
			return ({...state, loading: false , message: action.error.message, success: action.error.success });
		case ('login_success') :
			return ({...state, loading: false, user: action.data , delegateIsAvailable: action.data.data.delegate.available , isNotify:action.data.data.allow_notifications , message: action.data.message , success: action.data.success});
		case ('active_account') :
			return ({...state, loading: false, user: action.data , delegateIsAvailable: action.data.data.delegate.available , isNotify:action.data.data.allow_notifications , message: action.data.message , success: action.data.success});
		case ('profile_data'):
			return ({...state, loading: false, user: action.data , delegateIsAvailable: action.data.data.delegate.available , isNotify:action.data.data.allow_notifications , message: action.data.message , success: action.data.success});
		case ('update_profile') :
			return ({...state, loading: false, user: action , message: action.data.message , success: action.data.success});
		case ('isNotify') :
			return ({...state, isNotify: !state.isNotify});
		case ('delegateIsAvailable') :
			return ({...state, delegateIsAvailable: !state.delegateIsAvailable});
		case ('user_logout') :
			return ({...state, user: null});
		case ('register') :
			return ({...state, loading: false, message: action.payload.message});
		case ('temp_auth') :
			return ({...state, user: null});
		case ('logout') :
			return ({...state, user: null});
		default :
			return state;
	}

}