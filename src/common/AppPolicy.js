import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, ActivityIndicator, Dimensions, FlatList, I18nManager} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from './Header';
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {getPolicy} from '../actions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AppPolicy({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const policy = useSelector(state => state.policy.policy)
    const loader = useSelector(state => state.policy.loader)

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getPolicy(lang))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }



    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('appPolicy') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden'}]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon110 ,styles.SelfCenter , styles.marginVertical_25 ]} resizeMode={'contain'} />

                    {
                        policy ?
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ,styles.SelfCenter , styles.textCenter , styles.marginBottom_25 , {lineHeight:24}]}>
                                {policy.page}
                            </Text>
                            :
                            null
                    }

                </View>

            </Content>
        </Container>
    );
}

export default AppPolicy;


