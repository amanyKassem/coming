import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    I18nManager,
    ImageBackground,
    FlatList, ActivityIndicator
} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getEvents, setFavourite} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function FastingBreakfastDetails({navigation,route}) {

    const {type , id} = route.params;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const providerDetails = useSelector(state => state.categories.events);
    const providerDetailsLoader = useSelector(state => state.categories.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true);
        dispatch(getEvents(lang , id , token));
    }
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , providerDetailsLoader, route.params?.id]);

    useEffect(() => {
        setScreenLoader(false)
    }, [providerDetails]);


    function onToggleFavorite (id){
        dispatch(setFavourite(lang , id, token)).then(() => dispatch(getEvents(lang, id)))
    }


    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function Item({ name , desc , image  , id , index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('eventDetails' , {id})} style={[styles.bg_light_gray,styles.marginBottom_10 , styles.directionRow , styles.Radius_5 , {flex:1 , padding:10}]}>
                <Image source={{uri:image}} style={[styles.icon70 , styles.Radius_7]} resizeMode={'cover'} />
                <View style={[{marginLeft:15 , flex:1}]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.marginBottom_5 , styles.alignStart]}>{ name }</Text>
                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12 , styles.alignStart , styles.writingDir , {lineHeight:18}]}>{ desc }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderNoData() {
        if (providerDetails.events && (providerDetails.events).length <= 0) {
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
            {
                providerDetails?
                    <Content contentContainerStyle={[styles.bgFullWidth]} scrollEnabled={false}>
                        <ImageBackground source={require('../../assets/images/banner1.png')} resizeMode={'cover'} style={[styles.Width_100 ,  styles.height_300]}>
                            <View style={[styles.overlay_black , styles.heightFull , styles.Width_100]}>

                                <Header navigation={navigation} title={ i18n.t('providerDetails') } onToggleFavorite={() => onToggleFavorite(id)} likeIcon={providerDetails.is_favourite} />

                                <View style={[styles.directionColumnCenter , styles.marginTop_10]}>
                                    <View style={[styles.icon70 , styles.Radius_50 , styles.overlay_white, styles.marginBottom_7 ,{ padding: 5 }]}>
                                        <Image source={{uri:providerDetails.avatar}} style={[styles.Width_100 , styles.heightFull , styles.Radius_50]} resizeMode='cover' />
                                    </View>
                                    <Text style={[styles.textBold , styles.text_White , styles.textSize_14 , styles.textCenter , styles.marginBottom_5]}>{providerDetails.name}</Text>

                                    <View style={[styles.directionRow , styles.marginTop_5]}>
                                        <Icon type={'MaterialIcons'} name={'location-on'} style={[styles.textSize_14 , styles.text_mstarda , {marginRight:5}]} />
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_13]}>{providerDetails.address}</Text>
                                    </View>

                                    <View style={[styles.directionRow , styles.marginTop_10]}>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={providerDetails.rating}
                                            fullStarColor={'#fec104'}
                                            emptyStarColor={'#fff'}
                                            starSize={12}
                                            starStyle={{ marginHorizontal: 2}}
                                        />
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, {marginLeft:10}]}>{providerDetails.distance}</Text>
                                    </View>

                                </View>
                            </View>
                        </ImageBackground>

                        <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100, {overflow:'hidden'}]}>

                            <View style={[styles.marginTop_20 , styles.paddingHorizontal_20 , {height:IS_IPHONE_X ? height - 390 :  height - 320}]}>

                                {
                                    providerDetails.events && (providerDetails.events).length > 0?
                                        <FlatList
                                            data={providerDetails.events}
                                            horizontal={false}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item , index}) => <Item
                                                id={item.id}
                                                name={item.name}
                                                desc={item.details}
                                                image={item.image}
                                                index={index}
                                            />}
                                            keyExtractor={item => item.id}
                                        />
                                        :
                                        renderNoData()
                                }

                            </View>


                        </View>

                    </Content>
                    :
                    null
            }

        </Container>
    );
}

export default FastingBreakfastDetails;


