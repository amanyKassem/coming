import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getPlaces, deletePlace} from '../actions';
import Header from './Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function NewLocation({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const places = useSelector(state => state.places.places);
    const placesLoader = useSelector(state => state.places.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getPlaces(lang, token))
    }

    function deletePla(id){
        dispatch(deletePlace(lang , id, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , placesLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [places]);

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
        if (places && (places).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, {height:height-250}]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }



    return (
        <Container >
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth]}>

                <Header navigation={navigation} title={ i18n.t('selectNewLoc') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100 , styles.paddingHorizontal_25 , styles.paddingVertical_20 , {overflow:'hidden'}]}>

                    {
                        places && (places).length > 0?

                            places.map((place, i) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('home', { latitude: place.latitude , longitude:place.longitude , locFrom:'newLoc' })} style={[styles.directionRowSpace , styles.paddingVertical_15 , {borderBottomWidth:1 , borderBottomColor:'#ddd'}]}>

                                        <View style={[styles.directionRow , {flex:1}]}>
                                            <Image source={require('../../assets/images/circle_location.png')} style={[styles.icon12 , {marginRight:7}]} resizeMode='contain' />
                                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_15 , {lineHeight:22}]}>{place.name}</Text>
                                        </View>

                                        <View style={[styles.directionRow]}>
                                            <TouchableOpacity onPress={() => navigation.navigate('setLocation', {id: place.id, latitude: place.latitude , longitude:place.longitude, name: place.name, address: place.address, edit: true })}>
                                                <Image source={require('../../assets/images/edit_orange.png')} style={[styles.icon23]} resizeMode='contain' />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deletePla(place.id)} style={{borderLeftWidth:1 , borderLeftColor:'#ddd' , paddingLeft:15 , marginLeft:15}}>
                                                <Image source={require('../../assets/images/delete_red.png')} style={[styles.icon20]} resizeMode='contain' />
                                            </TouchableOpacity>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                            :
                            renderNoData()
                    }


                    <TouchableOpacity onPress={() => navigation.navigate('setLocation', { edit: false})} style={[styles.mstrdaBtn , styles.Width_100 , styles.marginBottom_10 , styles.marginTop_55]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('newLoc') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default NewLocation;


