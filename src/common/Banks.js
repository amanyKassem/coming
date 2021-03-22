import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getBanks} from '../actions';
import Header from './Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Banks({navigation,route}) {


    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const banks = useSelector(state => state.banks.banks);
    const banksLoader = useSelector(state => state.banks.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getBanks(lang))
    }
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , banksLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [banks]);

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (banks && (banks).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.heightFull]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }



    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('banks') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100 , styles.paddingHorizontal_20 , {overflow:'hidden' , paddingBottom:20}]}>

                    {
                        banks && (banks).length > 0?

                            banks.map((bank, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => navigation.navigate('bankTransfer' , {bank})} style={[styles.bg_gray , styles.paddingHorizontal_20 , styles.paddingVertical_15 , styles.Width_100 , styles.marginTop_15 , styles.Radius_10]}>

                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.alignStart]}>{ i18n.t('accName') } : {bank.account_name}</Text>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.marginTop_10 , styles.alignStart]}>{ i18n.t('bankName') } : {bank.bank_name}</Text>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.marginTop_10 , styles.alignStart]}>{ i18n.t('accNum') } : {bank.account_number}</Text>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_13 , styles.marginTop_10 , styles.alignStart]}>{bank.iban_number} : { i18n.t('iabn') }</Text>

                                    </TouchableOpacity>
                                )
                            })
                            :
                            renderNoData()
                    }
                </View>

            </Content>
        </Container>
    );
}

export default Banks;


