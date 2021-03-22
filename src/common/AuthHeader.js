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


const isIOS = Platform.OS === 'ios';

function AuthHeader({navigation}) {


    return (
        <ImageBackground source={require('../../assets/images/bg_login.png')} resizeMode={'cover'} style={[styles.Width_100 , styles.directionRowCenter , styles.height_230 , styles.marginBottom_25]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[{position:'absolute' , right:20 , top:45}]}>
                <Image source={require('../../assets/images/arrow_left.png')} style={[styles.icon20 , styles.transform]} resizeMode='contain' />
            </TouchableOpacity>
            <Image source={require('../../assets/images/logo_login.png')} style={[styles.width_180]} resizeMode='contain' />
        </ImageBackground>
    );
}

export default AuthHeader;


