import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground , ScrollView } from 'react-native'
import {Container, Content} from 'native-base';
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { chooseLang } from '../actions';
import {useSelector, useDispatch} from 'react-redux';

function Language({ navigation }) {


    const [lan, setLang] = useState('en')

    const language = useSelector(state => state.lang);
    console.log("language" , language.lang)

    const dispatch = useDispatch()

    function changeLang(lang){
        if(language !== lang){
            dispatch(chooseLang(lang));
        }
    }


    return (
        <ImageBackground source={require('../../assets/images/splash_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>
           <View style={[ styles.heightFull , styles.centerContext ]}>
               <ScrollView contentContainerStyle={[styles.flexCenter , styles.heightFull , styles.Width_100]} >
                   <Image source={require('../../assets/images/logo.png')} style={[styles.icon110 , styles.marginBottom_20]} resizeMode='contain' />
                   <Text style={[styles.textRegular , styles.text_black , styles.textSize_18, styles.marginBottom_25]}>{ i18n.t('chooseLang') }</Text>

                   <TouchableOpacity onPress={() => changeLang('ar') } style={[styles.langSelect]}>
                       <Image source={require('../../assets/images/saudi-arabia.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />
                       <View style={[styles.directionRow]}>
                           <View style={[styles.flexCenter,  styles.Radius_50 ,styles.icon17, {borderWidth:1 , borderColor:lan === 'ar' ? COLORS.mstarda : COLORS.black , padding:5}]}>
                               {lan === 'ar' ? <View style={[styles.icon10 , styles.Radius_50 ,  {backgroundColor:COLORS.mstarda}]}/> :  null}
                           </View>
                           <Text style={[styles.textRegular , styles.text_black , styles.textSize_14 , {marginLeft:15}]}>العربيه</Text>
                       </View>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={() => changeLang('en') } style={[styles.langSelect , styles.marginTop_35]}>
                       <Image source={require('../../assets/images/english-language.png')} style={{ height: 100, width: 100 }} resizeMode='contain' />
                       <View style={[styles.directionRow]}>
                           <View style={[styles.flexCenter,  styles.Radius_50 ,styles.icon17, {borderWidth:1 , borderColor:lan === 'en' ? COLORS.mstarda : COLORS.black , padding:5}]}>
                               {lan === 'en' ? <View style={[styles.icon10 , styles.Radius_50 ,  {backgroundColor:COLORS.mstarda}]}/> :  null}
                           </View>
                           <Text style={[styles.textRegular , styles.text_black , styles.textSize_14 , {marginLeft:15}]}>English</Text>
                       </View>
                   </TouchableOpacity>
               </ScrollView>
           </View>
        </ImageBackground>
    )
}

export default Language