import React, { useState , useEffect } from "react";
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
import { useDispatch, useSelector } from 'react-redux'
import {activeAccount} from "../actions";
import AuthHeader from "../common/AuthHeader";


const isIOS = Platform.OS === 'ios';

function ActivationCode({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const [spinner, setSpinner] = useState(false);
    const { token } = route.params;
    const dispatch = useDispatch();

    const [activationCode, setActivationCode] = useState('');

    function renderSubmit() {
        if (activationCode == '') {
            return (
                <View
                    style={[styles.mstrdaBtn , styles.Width_100  , styles.marginBottom_10 , {
                        backgroundColor:'#ddd'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('confirm') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        if (activationCode == 1122) {
            setSpinner(true);
            dispatch(activeAccount(activationCode, lang, token));
        }
        else {
            Toast.show({
                text        	: i18n.t('codeNotMatch'),
                type			: "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'flatRegular',
                    textAlign   	: 'center'
                }
            });
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
                    <View style={[styles.bgFullWidth, styles.Width_100 ]}>


                        <AuthHeader navigation={navigation}/>

                        <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_18 ,styles.SelfCenter , styles.marginBottom_25]}>{ i18n.t('activateAcc') }</Text>

                        <View style={[styles.directionRowSpace, styles.paddingHorizontal_25]}>
                            <KeyboardAvoidingView style={[styles.Width_100]}>
                                <Form style={[styles.Width_100 , styles.flexCenter]}>

                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label]}>{ i18n.t('activationCode') }</Label>
                                        <Input style={[styles.input]}
                                               onChangeText={(activationCode) => setActivationCode(activationCode)}
                                               keyboardType={'number-pad'}
                                        />

                                    </Item>

                                    {renderSubmit()}

                                </Form>
                            </KeyboardAvoidingView>
                        </View>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default ActivationCode;


