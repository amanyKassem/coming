import React from "react";
import {View, Text, Image, TouchableOpacity, I18nManager} from "react-native";
import {Icon,} from 'native-base'
import styles from '../../assets/styles'
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";

function FavItem({navigation , data , onToggleFavorite , isFav}) {

    return (

        <TouchableOpacity onPress={() => navigation.navigate('categoryDetails', {id:data.id , type :data.type})} style={[styles.borderGray,styles.marginBottom_20 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
            <Image source={{uri:data.image}} style={[styles.icon50 , styles.Radius_7]} resizeMode={'cover'} />
            <TouchableOpacity onPress={onToggleFavorite} style={[styles.touchFav , styles.marginTop_10]}>
                <Icon style={[isFav ? styles.text_red : styles.text_midGray, styles.textSize_18]} type="AntDesign" name={ 'heart' } />
            </TouchableOpacity>
            <View style={[{marginLeft:15 , flex:1}]}>
                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.alignStart]}>{ data.name }</Text>
                <View style={[styles.directionRow , styles.marginTop_7]}>
                    <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 , {lineHeight:20}]}>{ data.location }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FavItem;


