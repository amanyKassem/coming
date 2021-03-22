import React , {useEffect} from "react";
import {  AsyncStorage } from 'react-native';
import { NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackNavigator } from './AuthStackNavigator'
import { MainStackNavigator } from './MainStackNavigator'
import { DelegateStackNavigator } from './DelegateStackNavigator'
import {useSelector} from 'react-redux';


const RootStack = createStackNavigator();

function renderScreens() {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state =>  state.auth.user != null ? state.auth.user.data : null );

	if (auth.user !== null) {
		if(user.user_type === 2)
			return ( <RootStack.Screen name={'MainStack'} component={MainStackNavigator} /> );
		else
			return ( <RootStack.Screen name={'MainStack'} component={DelegateStackNavigator}/> )
	}
	return (<RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>)
}


function AppNavigator() {

	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{headerShown: false}} >
				{ renderScreens() }
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;
