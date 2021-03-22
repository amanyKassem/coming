import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    ImageBackground,
    FlatList, ActivityIndicator
} from "react-native";
import {CheckBox, Container, Content, Form, Icon, Input, Item, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getEvent} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function EventDetails({navigation,route}) {

    const {id} = route.params;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const event= useSelector(state => state.categories.event);
    const eventLoader = useSelector(state => state.categories.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true);
        dispatch(getEvent(lang , id, token));
    }
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , eventLoader, route.params?.id]);

    useEffect(() => {
        setScreenLoader(false)
    }, [event]);

    function renderLoader(){
        if (screenLoader){
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
            {
                event?
                    <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_White]}>
                        <ImageBackground source={{uri:event.cover}} resizeMode={'cover'} style={[styles.Width_100 , styles.height_230 , {borderBottomRightRadius:25 , borderBottomLeftRadius:25 , overflow:'hidden'}]}>
                            <View style={[styles.overlay_black , styles.heightFull , styles.Width_100]}>

                                <Header navigation={navigation} title={ event.name } />

                            </View>
                        </ImageBackground>

                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20 , styles.marginTop_10, {overflow:'hidden'}]}>

                            <View style={[styles.directionRowSpace, styles.marginTop_5]}>
                                <Text style={[styles.textBold , styles.text_gray , styles.textSize_16]}>{event.meal_name}</Text>
                                <Text style={[styles.textBold , styles.text_mstarda , styles.textSize_16 ]}>{event.price} { i18n.t('RS') }</Text>
                            </View>

                            <View style={[styles.directionRow , styles.marginTop_15]}>
                                <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 , styles.writingDir]}>{event.address}</Text>
                            </View>

                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 , styles.marginTop_15 , styles.alignStart , styles.writingDir , {lineHeight:24}]}>
                                {event.details}
                            </Text>

                            <View style={[styles.line , styles.marginVertical_20]}/>

                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_15 , styles.alignStart , styles.marginBottom_10]}>{i18n.t('mealsAval') }</Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , styles.alignStart , styles.marginBottom_20]}>{event.available_meals}</Text>


                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_15 , styles.alignStart , styles.marginBottom_10]}>{i18n.t('eventDate') }</Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , styles.alignStart , styles.marginBottom_20]}>{event.day}</Text>


                            <Text style={[styles.textBold , styles.text_gray , styles.textSize_15 , styles.alignStart , styles.marginBottom_10]}>{i18n.t('eventTime') }</Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14 , styles.alignStart]}>{event.time}</Text>



                            <View style={[styles.line , styles.marginVertical_20]}/>


                            {
                                token ?
                                    <TouchableOpacity onPress={() => navigation.navigate('eventPayMethod' , {id})} style={[styles.mstrdaBtn , styles.Width_90 , styles.SelfCenter  , styles.marginBottom_20]}>
                                        <Text style={[styles.textBold , styles.text_White , styles.textSize_14]}>{ i18n.t('presence') }</Text>
                                    </TouchableOpacity>
                                    :
                                    null

                            }

                        </View>

                    </Content>
                    :
                    null
            }
        </Container>
    );
}

export default EventDetails;


