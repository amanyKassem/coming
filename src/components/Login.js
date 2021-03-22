import React, { useState , useEffect , useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator,
    Platform,
    ImageBackground
} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {userLogin} from '../actions';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AuthHeader from '../common/AuthHeader'


const isIOS = Platform.OS === 'ios';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


function Login({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        setTimeout(() => registerForPushNotificationsAsync().then(token => setExpoPushToken(token)) , 3000)


        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;

            AsyncStorage.setItem('deviceID', token)

            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, [auth]);



    function validate() {
        let isError = false;
        let msg = '';

        if (phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (password.length < 6) {
            isError = true;
            msg = i18n.t('passreq');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'flatRegular',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    function renderSubmit() {
        if (password == '' || phone == '') {
            return (
                <View
                    style={[styles.mstrdaBtn , styles.Width_100  , styles.marginBottom_10 , {
                        backgroundColor:'#ddd'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('login') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onLoginPressed()} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('login') }</Text>
            </TouchableOpacity>
        );
    }

    function onLoginPressed() {
        const err = validate();

        if (!err){
            setSpinner(true);
            dispatch(userLogin(phone, password, expoPushToken , lang , navigation));
        }
    }

    function renderLoader(){
        if (spinner){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <Container >
            {renderLoader()}
            <ImageBackground source={require('../../assets/images/splash_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bgFullWidth, styles.Width_100]}>

                        <AuthHeader navigation={navigation}/>

                        <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_18 ,styles.SelfCenter , styles.marginBottom_25]}>{ i18n.t('login') }</Text>

                       <View style={[styles.directionRowSpace , styles.paddingHorizontal_25]}>

                           <KeyboardAvoidingView style={[styles.Width_100]}>
                               <Form style={[styles.Width_100 , styles.flexCenter]}>

                                   <Item style={[styles.item]}>
                                       <Label style={[styles.label]}>{ i18n.t('phone') }</Label>
                                       <Input style={[styles.input]} onChangeText={(phone) => setPhone(phone)} keyboardType={'number-pad'} />

                                   </Item>

                                   <Item style={[styles.item , styles.marginBottom_30]}>
                                       <Label style={[styles.label]}>{ i18n.t('password') }</Label>
                                       <Input style={[styles.input , {paddingRight:35}]} onChangeText={(password) => setPassword(password)} secureTextEntry={!showPass} />
                                       <TouchableOpacity onPress={() => setShowPass(!showPass)} style={[{position:'absolute' , right:10  , bottom:13}]}>
                                           <Icon type={'FontAwesome'} name={showPass ? "eye-slash" : "eye"}
                                                 style={[styles.textSize_18,styles.text_gray]} />
                                       </TouchableOpacity>
                                   </Item>

                                   {renderSubmit()}

                                   <TouchableOpacity onPress={() => navigation.navigate('MainStack')}
                                       style={[styles.mstrdaBtn , styles.Width_100  , styles.marginBottom_10 , {
                                           backgroundColor:'#ddd'
                                       }]}
                                   >
                                       <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('visitor') }</Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')} style={[styles.marginTop_10 , styles.marginBottom_15]}>
                                       <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('forgetPassword') }</Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity onPress={() => navigation.navigate('registerAs')} style={[styles.marginBottom_35 , styles.directionRow]}>
                                       <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , {marginRight:5}]}>{ i18n.t('haveNoAcc') }</Text>
                                       <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14]}>{ i18n.t('clickHere') }</Text>
                                   </TouchableOpacity>


                               </Form>
                           </KeyboardAvoidingView>
                       </View>

                   </View>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default Login;


