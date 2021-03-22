import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Platform,
    ImageBackground
} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useSelector, useDispatch} from 'react-redux';
import {getIntro} from '../actions';


const isIOS = Platform.OS === 'ios';
const { width , height } = Dimensions.get('window');
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function Intro({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const intro = useSelector(state => state.intro.intro)
    const loader = useSelector(state => state.intro.loader)

    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getIntro(lang , token))
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
        <Container >
            {renderLoader()}
            {/*<ImageBackground source={require('../../assets/images/splash_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>*/}
                <Content contentContainerStyle={[styles.bgFullWidth]}>
                    <View style={[styles.bgFullWidth, styles.Width_100]}>
                        <SwiperFlatList
                            index={0}
                            showPagination
                            paginationActiveColor={COLORS.mstarda}
                            paginationStyle={[styles.marginBottom_65]}
                            paginationStyleItem={{ width: 10, height: 10 ,marginHorizontal:5}}
                        >

                            {
                                intro.map((intr, i) => (
                                    <View style={[styles.heightFull , {width}]} key={i}>
                                        <Image source={{uri:intr.image}} style={[{width , height:'100%'}]} resizeMode={'cover'} />
                                        <View style={[styles.wrapText , IS_IPHONE_X ? styles.marginTop_120 : null]}>
                                            <Text style={[styles.text_black , styles.textBold , styles.textSize_18 , styles.textCenter]}>{intr.title}</Text>
                                            <Text numberOfLines={4} style={[styles.text_gray , styles.textRegular , styles.textSize_14 , styles.marginTop_10 , styles.textCenter , {lineHeight:24}]}> {intr.details} </Text>
                                        </View>
                                        {
                                            intro.length == i + 1 ?
                                                <TouchableOpacity style={styles.introButton} onPress={() => navigation.navigate('login')}>
                                                    <Text style={[styles.text_White , styles.textBold , styles.textSize_18]}>
                                                        {i18n.t('start')}
                                                    </Text>
                                                </TouchableOpacity> : null
                                        }
                                    </View>
                                ))
                            }


                        </SwiperFlatList>

                    </View>
                </Content>
            {/*</ImageBackground>*/}
        </Container>
    );
}


export default Intro;


