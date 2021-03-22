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
import AuthHeader from "../common/AuthHeader";


const isIOS = Platform.OS === 'ios';

function RegisterAs({navigation}) {


    return (
        <Container >
            <ImageBackground source={require('../../assets/images/splash_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bgFullWidth, styles.Width_100]}>

                        <AuthHeader navigation={navigation}/>

                        <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_18 ,styles.SelfCenter , styles.marginBottom_25]}>{ i18n.t('register') }</Text>

                        <View style={[styles.directionColumnCenter , styles.paddingHorizontal_25 , styles.marginTop_35]}>

                            <TouchableOpacity onPress={() => navigation.navigate('register' , {userType:2})} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('asUser') }</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => navigation.navigate('register' , {userType:3})} style={[styles.mstrdaBtn , styles.Width_100 , styles.bg_gray , styles.marginBottom_10]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('asDelegate') }</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Content>
            </ImageBackground>
        </Container>
    );
}

export default RegisterAs;


