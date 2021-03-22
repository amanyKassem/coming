import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Icon,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Footer({navigation , activeTab , delegate}) {

    return (
        <View style={[styles.footerStyle , styles.shadow]}>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={[styles.directionColumnCenter]}>
                <Image source={activeTab === 'home' ? require('../../assets/images/home_yellow.png') : require('../../assets/images/home_gray.png')} style={[styles.icon20 , styles.marginBottom_5]} resizeMode={'contain'} />
                <Text style={[styles.textBold , activeTab === 'home' ? styles.text_mstarda : styles.text_gray, styles.textCenter , styles.textSize_12]}>{i18n.t('home')}</Text>
            </TouchableOpacity>

            {
                delegate ?
                    <TouchableOpacity onPress={() => navigation.navigate('orders')} style={[styles.directionColumnCenter]}>
                        <Image source={activeTab === 'orders' ? require('../../assets/images/delivery_yellow.png') : require('../../assets/images/delivery_gray.png')} style={[styles.icon20 , styles.marginBottom_5]} resizeMode={'contain'} />
                        <Text style={[styles.textBold , activeTab === 'orders' ? styles.text_mstarda : styles.text_gray, styles.textCenter , styles.textSize_12]}>{i18n.t('orders')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate('favourite')} style={[styles.directionColumnCenter]}>
                        <Image source={activeTab === 'favourite' ? require('../../assets/images/heart_yellow.png') : require('../../assets/images/heart_gray.png')} style={[styles.icon20 , styles.marginBottom_5]} resizeMode={'contain'} />
                        <Text style={[styles.textBold , activeTab === 'favourite' ? styles.text_mstarda : styles.text_gray, styles.textCenter , styles.textSize_12]}>{i18n.t('favourite')}</Text>
                    </TouchableOpacity>
            }


            {
                delegate ?
                    <TouchableOpacity onPress={() => navigation.navigate('comments')} style={[styles.directionColumnCenter]}>
                        <Image source={activeTab === 'comments' ? require('../../assets/images/comment_yellow.png') : require('../../assets/images/comment_gray.png')} style={[styles.icon20 , styles.marginBottom_5]} resizeMode={'contain'} />
                        <Text style={[styles.textBold , activeTab === 'comments' ? styles.text_mstarda : styles.text_gray, styles.textCenter , styles.textSize_12]}>{i18n.t('comments')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate('offers')} style={[styles.directionColumnCenter]}>
                        <Image source={activeTab === 'offers' ? require('../../assets/images/discount_yellow.png') : require('../../assets/images/discount_gray.png')} style={[styles.icon20 , styles.marginBottom_5]} resizeMode={'contain'} />
                        <Text style={[styles.textBold , activeTab === 'offers' ? styles.text_mstarda : styles.text_gray, styles.textCenter , styles.textSize_12]}>{i18n.t('offers')}</Text>
                    </TouchableOpacity>
            }


            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={[styles.directionColumnCenter]}>
                <Image source={activeTab === 'profile' ? require('../../assets/images/user_yellow.png') : require('../../assets/images/user_gray.png')} style={[styles.icon20 , styles.marginBottom_5]} resizeMode={'contain'} />
                <Text style={[styles.textBold , activeTab === 'profile' ? styles.text_mstarda : styles.text_gray, styles.textCenter , styles.textSize_12]}>{i18n.t('profile')}</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Footer;


