import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications , deleteNoti} from '../../actions';
import Header from '../../common/Header';
import COLORS from "../../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Notifications({navigation,route}) {


    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const notifications = useSelector(state => state.notifications.notifications);
    const notificationsLoader = useSelector(state => state.notifications.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getNotifications(lang, token))
    }
    function deleteNotify(id){
        dispatch(deleteNoti(lang , id, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , notificationsLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [notifications]);

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
        if (notifications && (notifications).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.heightFull]}>
                    <Image source={require('../../../assets/images/note.png')} resizeMode={'contain'}
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

                <Header navigation={navigation} title={ i18n.t('notifications') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100 , styles.paddingHorizontal_20 , {overflow:'hidden' , paddingBottom:20}]}>


                    {
                        notifications && (notifications).length > 0?

                            notifications.map((noty, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => navigation.navigate('orderDetails' , {id:noty.id})} style={[styles.borderGray, styles.directionRow  , styles.Radius_5 , styles.marginTop_15 , styles.paddingVertical_5 , styles.paddingHorizontal_10]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.writingDir , {marginRight:15 , lineHeight:22, flex:1}]}>{noty.body}</Text>
                                        <TouchableOpacity onPress = {() => deleteNotify(noty.id)} style={[styles.paddingVertical_5 , styles.paddingHorizontal_5, styles.Radius_50]}>
                                            <Image source={require('../../../assets/images/delete_red.png')} style={[styles.icon23]} resizeMode={'contain'} />
                                        </TouchableOpacity>
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

export default Notifications;


