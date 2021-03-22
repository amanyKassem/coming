import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Icon,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-native-modal";
import {Textarea} from "native-base";
// import {getNotifications} from '../actions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Header({navigation , title , cartCount , onToggleFavorite , filteration , onNearProvider ,onFarProvider, onRateProvider, likeIcon , fromLoc , delegate}) {

    // const lang          = useSelector(state => state.lang.lang);
    const token         = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    // const user          = useSelector(state => state.auth.user ? state.auth.user.data :  {avatar: null});
    const notifications = useSelector(state => state.notifications.notifications);

    const [showFilter, setShowFilter] = useState(false);


    function toggleFilter (){
        setShowFilter(!showFilter)
    }

    return (
        <View style={[styles.directionRowSpace , styles.paddingHorizontal_15 ,  title !== i18n.t('selectNewLoc') ?styles.marginTop_20 : null ,
            isIOS ? styles.height_50 : styles.height_80 ,
            isIOS ? styles.marginBottom_10 : null ,
            ,styles.Width_100 , title === i18n.t('selectNewLoc')  ? styles.shadow : null,  {
            borderBottomWidth:title === i18n.t('selectNewLoc')  ? 1 : 0,
            borderBottomColor:title === i18n.t('selectNewLoc')  ? '#ddd' : 0,
        }]}>

            <View style={[styles.directionRow]}>
                {
                    title !== i18n.t('selectLoc') && title !== i18n.t('terms') && !fromLoc ?
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginRight:15}}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    token && title === i18n.t('home')  && !fromLoc?
                        <TouchableOpacity onPress={() => navigation.navigate('notifications')} style={[styles.icon30 , {marginRight:15 , padding:5}]}>
                            <Image source={notifications.length > 0 ? require('../../assets/images/notication_acctive.png') : require('../../assets/images/notification_non_active.png')} style={[styles.transform , styles.Width_100 , styles.heightFull]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        :
                        null
                }

            </View>

            <Text style={[styles.textBold , title === i18n.t('selectNewLoc')  ? styles.text_gray : styles.text_White , styles.textSize_16 , styles.textCenter ,
                    {flex:title === i18n.t('selectLoc') || delegate ?1:0  , right : title === i18n.t('home') && delegate ? 30 : title === i18n.t('home') && fromLoc? -10 : title === i18n.t('home') ? 10 : 0}]}>
                {title}
            </Text>


            {
                title === i18n.t('home') && !delegate && !fromLoc ?
                    <View style={[styles.directionRow]}>
                        <TouchableOpacity onPress={() => navigation.navigate('basket')} >
                            <View style={{marginLeft:15}}>
                                <Image source={require('../../assets/images/basket.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                            </View>
                            <View style={[styles.icon15 , styles.Radius_50 , styles.bg_mstarda , styles.justifyCenter ,{position:'absolute' , left:12 , top:0}]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_10 , styles.flexCenter]}>{cartCount}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    :

                    title !== i18n.t('selectLoc') && filteration ?
                        <View style={[styles.directionRow]}>

                            <TouchableOpacity onPress={() => toggleFilter()} >
                                <Image source={require('../../assets/images/filter.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft:10}} >
                                <Image source={require('../../assets/images/arrow_left.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>

                            {
                                showFilter ?
                                    <View style={[styles.bg_White, styles.overHidden, styles.flexCenter , styles.shadow,styles.width_120, styles.Radius_7 ,
                                        {position:'absolute' , top:25 , right:30 , left:null , zIndex:1}]}>

                                        <View style={[styles.bg_mstarda , styles.Width_100 , styles.paddingVertical_7 , styles.centerContext]}>
                                            <Text style={[styles.textBold , styles.text_White , styles.textSize_12]}>{ i18n.t('sortBy') }</Text>
                                        </View>

                                        <View style={[styles.Width_100 , styles.directionColumnCenter]}>
                                            <TouchableOpacity onPress={() =>{ onNearProvider() ; setShowFilter(false)}} style={[styles.Width_100 , styles.centerContext , {borderBottomWidth:1 , borderColor:'#ddd' , padding:7}]}>
                                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{ i18n.t('closest') }</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>{ onFarProvider() ; setShowFilter(false)}} style={[styles.Width_100 , styles.centerContext , {borderBottomWidth:1 , borderColor:'#ddd' , padding:7}]}>
                                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{ i18n.t('furthest') }</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>{ onRateProvider() ; setShowFilter(false)}} style={[styles.Width_100 , styles.centerContext , {padding:7}]}>
                                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{ i18n.t('rate') }</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    :
                                    null
                            }

                        </View>
                        :

                        title === i18n.t('providerDetails') ||  title ===  i18n.t('details')  ?
                            <View style={[styles.directionRow]}>

                                {
                                    token ?
                                        <TouchableOpacity onPress={onToggleFavorite}>
                                            <Icon style={[likeIcon ? styles.text_red : styles.text_White, styles.textSize_20]} type="AntDesign" name={ 'heart' } />
                                        </TouchableOpacity>
                                        :
                                        null
                                }


                                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft:10}} >
                                    <Image source={require('../../assets/images/arrow_left.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                                </TouchableOpacity>

                            </View>
                            :

                            title !== i18n.t('selectLoc') && !delegate?
                                <TouchableOpacity onPress={() => navigation.goBack()} >
                                    <Image source={require('../../assets/images/arrow_left.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                :
                                null
            }

        </View>
    );
}

export default Header;


