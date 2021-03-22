import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ImageBackground} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function SelectLoc({navigation,route}) {


    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('selectLoc') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100 , styles.paddingHorizontal_20 , {overflow:'hidden' , paddingBottom:20}]}>

                    <View style={[styles.directionColumnCenter , styles.bgFullWidth]}>


                        <Image source={require('../../assets/images/home_order_vector.png')} style={[styles.icon150 , styles.marginBottom_50]} resizeMode='contain' />


                        <TouchableOpacity onPress={() => navigation.navigate('myDrawer', {screen: 'tabs'})} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('currentLoc') }</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate('newLocation')} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('changeLoc') }</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default SelectLoc;


