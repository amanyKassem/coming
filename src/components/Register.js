import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    I18nManager,
    ActivityIndicator,
    Platform,
    ImageBackground
} from "react-native";
import {CheckBox, Container, Content, Form, Icon, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import AuthHeader from "../common/AuthHeader";
import {useDispatch, useSelector} from "react-redux";
import {checkPhone, register} from "../actions";
import { WebView } from 'react-native-webview';


const isIOS = Platform.OS === 'ios';

function Register({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const [spinner, setSpinner] = useState(false);

    const userType = route.params.userType;
    const dispatch = useDispatch();


    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    function _onLoad(state, navigation) {
        console.log(state.url);
    }


    const validate = () => {
        let isError         = false;
        let msg             = '';

        if (username.length <= 0) {
            isError     = true;
            msg         = i18n.t('name');
        } else if (phone.length <= 0 || phone.length !== 10) {
            isError     = true;
            msg         = i18n.t('phoneValidation');
        } else if (phone.length <= 0) {
            isError     = true;
            msg         = i18n.t('namereq');
        } else if (password.length < 6){
            isError     = true;
            msg         = i18n.t('passreq');
        }

        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });
        }

        return isError;
    };


    function renderSubmit() {
        if (phone == '' || username == '' || mail == '' || password == '' || !isChecked) {
            return (
                <View
                    style={[styles.mstrdaBtn , styles.Width_100  , styles.marginBottom_10 , {
                        backgroundColor:'#ddd'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('createAcc') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('createAcc') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        const err = validate();

        if (!err){
            setSpinner(true);
            const data = { username, phone, mail, password , userType, lang };
            dispatch(register(data, navigation)).then(() => setSpinner(false));
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

                        {
                            userType == 2 ?
                                <>
                                    <AuthHeader navigation={navigation}/>

                                    <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_18 ,styles.SelfCenter , styles.marginBottom_25]}>{ i18n.t('createAcc') }</Text>

                                    <View style={[styles.directionRowSpace , styles.paddingHorizontal_25]}>
                                    <KeyboardAvoidingView style={[styles.Width_100]}>
                                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                                            <Item style={[styles.item]}>
                                                <Label style={[styles.label]}>{ i18n.t('username') }</Label>
                                                <Input style={[styles.input]}
                                                       onChangeText={(username) => setUsername(username)}
                                                />

                                            </Item>

                                            <Item style={[styles.item]}>
                                                <Label style={[styles.label]}>{ i18n.t('phone') }</Label>
                                                <Input style={[styles.input]}
                                                       onChangeText={(phone) => setPhone(phone)}
                                                       keyboardType={'number-pad'}
                                                />

                                            </Item>

                                            <Item style={[styles.item]}>
                                                <Label style={[styles.label]}>{ i18n.t('mail') }</Label>
                                                <Input style={[styles.input]}
                                                       onChangeText={(mail) => setMail(mail)}
                                                       keyboardType={'email-address'}
                                                />

                                            </Item>


                                            <Item style={[styles.item]}>
                                                <Label style={[styles.label]}>{ i18n.t('password') }</Label>
                                                <Input style={[styles.input , {paddingRight:35}]}
                                                       onChangeText={(password) => setPassword(password)}
                                                       secureTextEntry={!showPass}
                                                />
                                                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={[{position:'absolute' , right:10  , bottom:13}]}>
                                                    <Icon type={'FontAwesome'} name={showPass ? "eye-slash" : "eye"}
                                                          style={[styles.textSize_18,styles.text_gray]} />
                                                </TouchableOpacity>
                                            </Item>

                                            <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={[styles.marginBottom_25 , styles.directionRowCenter, styles.alignStart]}>
                                                <CheckBox style={[styles.checkBox]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.mstarda}/>
                                                <View style={[styles.directionRow]}>
                                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>
                                                        { i18n.t('agreeTo') }
                                                    </Text>
                                                    <TouchableOpacity onPress={() => navigation.navigate('terms')}>
                                                        <Text style={[styles.textRegular ,styles.textDecoration , styles.text_mstarda, styles.textSize_12 ]}>{ i18n.t('terms') }</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>

                                            {renderSubmit()}

                                            <TouchableOpacity onPress={() => navigation.navigate('login')} style={[styles.marginTop_10 , styles.marginBottom_30 , styles.directionRow]}>
                                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , {marginRight:5}]}>{ i18n.t('haveAcc') }</Text>
                                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14]}>{ i18n.t('clickHere') }</Text>
                                            </TouchableOpacity>

                                        </Form>
                                    </KeyboardAvoidingView>
                                </View>
                                </>
                                :
                                <WebView
                                    source = {{uri: 'https://ahlalbalad.aait-sa.com/backend/register-delegate/'+ lang}}
                                    style  = {{flex:1 , width:'100%' , height:'100%'}}
                                    domStorageEnabled={true}
                                    startInLoadingState={true}
                                    scalesPageToFit={false}
                                    scrollEnabled={true}
                                    javaScriptEnabled={true}
                                    onNavigationStateChange={(state) => _onLoad(state, navigation)}
                                />
                        }



                    </View>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default Register;


