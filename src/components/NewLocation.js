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

function NewLocation({navigation,route}) {


    return (
        <Container >

            <Content contentContainerStyle={[styles.bgFullWidth]}>

                <Header navigation={navigation} title={ i18n.t('selectNewLoc') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100 , styles.paddingHorizontal_25 , styles.paddingVertical_20 , {overflow:'hidden'}]}>

                    <TouchableOpacity onPress={() => navigation.navigate('setLocation')} style={[styles.directionRowSpace , styles.paddingVertical_15 , {borderBottomWidth:1 , borderBottomColor:'#ddd'}]}>

                        <View style={[styles.directionRow , {flex:1}]}>
                            <Image source={require('../../assets/images/circle_location.png')} style={[styles.icon12 , {marginRight:7}]} resizeMode='contain' />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_15 , {lineHeight:22}]}>الرياض جدة السعودية</Text>
                        </View>

                        <View style={[styles.directionRow]}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/edit_orange.png')} style={[styles.icon23]} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderLeftWidth:1 , borderLeftColor:'#ddd' , paddingLeft:15 , marginLeft:15}}>
                                <Image source={require('../../assets/images/delete_red.png')} style={[styles.icon20]} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('myDrawer', {screen: 'tabs'})} style={[styles.directionRowSpace  , styles.paddingVertical_15 , {borderBottomWidth:1 , borderBottomColor:'#ddd'}]}>

                        <View style={[styles.directionRow , {flex:1}]}>
                            <Image source={require('../../assets/images/circle_location.png')} style={[styles.icon12 , {marginRight:7}]} resizeMode='contain' />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_15 , {lineHeight:22}]}>الرياض جدة السعودية</Text>
                        </View>

                        <View style={[styles.directionRow]}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/edit_orange.png')} style={[styles.icon23]} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderLeftWidth:1 , borderLeftColor:'#ddd' , paddingLeft:15 , marginLeft:15}}>
                                <Image source={require('../../assets/images/delete_red.png')} style={[styles.icon20]} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('myDrawer', {screen: 'tabs'})} style={[styles.directionRowSpace  , styles.paddingVertical_15 , {borderBottomWidth:1 , borderBottomColor:'#ddd'}]}>

                        <View style={[styles.directionRow , {flex:1}]}>
                            <Image source={require('../../assets/images/circle_location.png')} style={[styles.icon12 , {marginRight:7}]} resizeMode='contain' />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_15 , {lineHeight:22}]}>الرياض جدة السعودية</Text>
                        </View>

                        <View style={[styles.directionRow]}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/edit_orange.png')} style={[styles.icon23]} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderLeftWidth:1 , borderLeftColor:'#ddd' , paddingLeft:15 , marginLeft:15}}>
                                <Image source={require('../../assets/images/delete_red.png')} style={[styles.icon20]} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10 , styles.marginTop_55]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('newLoc') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default NewLocation;


