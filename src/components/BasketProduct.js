import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, I18nManager} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import  Modal  from "react-native-modal";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function BasketProduct({pro, DeleteProducts, Decrease, Increase}) {
    const [showModal, setShowModal] = useState(false);

    const [count, setCount] = useState(0);


    function toggleModal () {
        setShowModal(!showModal);
    };

    useEffect(() => {
        setCount(pro.quantity);
    }, [])


    const increment = () => {
        Increase()

        setCount(count + 1);
    }

    const decrement = () => {
        Decrease()

        if (count === 1) {
            setCount(1);
        } else {
            setCount(count - 1);
        }
    }


    return (
        <View>
            <ScrollView horizontal style={[styles.borderGray , styles.alignStart, styles.marginBottom_5 ]} contentContainerStyle={[styles.directionRow ,styles.paddingHorizontal_10 , styles.paddingVertical_10 , {minWidth:'100%'}]}>
                <View style={[styles.directionRow , styles.paddingHorizontal_5]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12 , styles.alignStart , {marginRight:5}]}>{pro.name}</Text>
                    {
                        pro.details.extras && ( pro.details.extras).length > 0?
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_12 , styles.alignStart]}>( {i18n.t('details') } )</Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                </View>

                <View style={[styles.directionRow, styles.paddingHorizontal_10 , styles.marginHorizontal_20 ,{borderRightWidth:1 , borderLeftWidth:1 , borderColor:'#ddd'}]}>
                    <TouchableOpacity onPress={increment} style={[styles.icon25 , styles.bg_mstarda , styles.centerContext , styles.Radius_5]}>
                        <Icon type={'AntDesign'} name={'plus'} style={[styles.textSize_12 , styles.text_White ]} />
                    </TouchableOpacity>
                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_12 , styles.marginHorizontal_15 ]}>{count}</Text>
                    <TouchableOpacity onPress={decrement} style={[styles.icon25 , styles.centerContext  , styles.Radius_5, {backgroundColor:'#ddd'}]}>
                        <Icon type={'AntDesign'} name={'minus'} style={[styles.textSize_12 , styles.text_gray ]} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_12]}>{pro.price} {i18n.t('RS')}</Text>
                    <TouchableOpacity onPress={DeleteProducts}>
                        <Image source={require('../../assets/images/delete_red.png')} style={[styles.icon25 , {marginLeft:10}]} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>

                <Modal
                    onBackdropPress                 ={toggleModal}
                    onBackButtonPress               = {toggleModal}
                    isVisible                       = {showModal}
                    style                           = {styles.bgModel}
                    avoidKeyboard                    = {true}
                >

                    <View style={[styles.bg_White, styles.overHidden, styles.Width_100, {borderTopStartRadius:5 , borderTopEndRadius:5}]}>

                        <View style={[styles.bg_gray , styles.Width_100 , styles.paddingVertical_15 , styles.paddingHorizontal_20]}>
                            <Text style={[styles.textBold , styles.text_White , styles.textSize_15 , styles.alignStart]}>{ i18n.t('details') }</Text>
                        </View>

                        <View style={[styles.paddingHorizontal_20 , styles.paddingVertical_20]}>

                            {
                                pro.details.extras.map((extra, i) => {
                                    return (
                                        <View style={[styles.directionRowSpace]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 , styles.marginBottom_10 , styles.alignStart]}>- {extra.name}</Text>
                                            <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 , styles.marginBottom_10 , styles.alignStart]}>{extra.price} { i18n.t('RS') }</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>


                    </View>

                </Modal>
            </ScrollView>
        </View>
    );
}

export default BasketProduct;


