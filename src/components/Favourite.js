import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    I18nManager,
    ScrollView,
    ActivityIndicator
} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getFavourites , setFavourite} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import FavItem from "./FavItem";
import {useIsFocused} from "@react-navigation/native";
import Footer from "../common/Footer";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Favourite({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const favourites = useSelector(state => state.favourites.favourites);
    const favouritesLoader = useSelector(state => state.favourites.loader);
    const [screenLoader , setScreenLoader ] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getFavourites(lang, token)).then(() => setScreenLoader(false))
    }



    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused])

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
        if (favourites && (favourites).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.heightFull]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }


    function Item({ name , image , location , id , index , isFav }) {
        return (
            <FavItem data={{name , image , location , id , index}} isFav={isFav}
                   onToggleFavorite={() => onToggleFavorite(id)}
                   navigation={navigation}/>
        );
    }

    function onToggleFavorite (id){
        dispatch(setFavourite(lang , id, token)).then(() => dispatch(getFavourites(lang, token)))
    }


    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('favourite') } />

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden'}]}>

                    <View style={[styles.marginTop_20]}>

                        {
                            favourites && (favourites).length > 0?
                                <FlatList
                                    data={favourites}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        id={item.id}
                                        name={item.name}
                                        image={item.avatar}
                                        location={item.address}
                                        isFav={item.is_favourite}
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
            <Footer navigation={navigation} activeTab={'favourite'}/>
        </Container>
    );
}

export default Favourite;


