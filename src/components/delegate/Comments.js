import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../../assets/styles'
import i18n from "../../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import Header from '../../common/Header';
import COLORS from "../../consts/colors";
import StarRating from "react-native-star-rating";
import {useIsFocused} from "@react-navigation/native";
import {getComments} from "../../actions";
import Footer from "../../common/Footer";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Comments({navigation,route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const comments = useSelector(state => state.comments.comments);
    const [screenLoader , setScreenLoader ] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getComments(lang, token)).then(() => setScreenLoader(false))
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
        if (comments && (comments).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.heightFull]}>
                    <Image source={require('../../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }

    function Item({ name , image , comment , rate , id , index }) {
        return (
            <View style={[styles.borderGray,styles.marginBottom_20 , styles.directionBasicRow , styles.Radius_5 , {flex:1 , padding:10}]}>
                <Image source={{uri:image}} style={[styles.icon33 , styles.Radius_50]} resizeMode={'cover'} />
                <View style={[{marginLeft:15 , flex:1}]}>
                    <View style={styles.directionRow}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12]}>{ name.substr(0,20) }</Text>
                        <View style={[styles.directionRow , {marginLeft:30}]}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={rate}
                                fullStarColor={'#fec104'}
                                starSize={10}
                                starStyle={{ marginHorizontal: 2 }}
                            />
                        </View>
                    </View>
                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12 , styles.writingDir ,styles.marginTop_5, {lineHeight:20}]}>{ comment }</Text>
                </View>
            </View>
        );
    }



    return (
        <Container style={[styles.bg_gray]}>
            {
                renderLoader()
            }
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('comments') }/>

                <View style={[styles.bgFullWidth ,styles.bg_White, styles.Width_100,styles.paddingHorizontal_20, {overflow:'hidden' , zIndex:-1}]}>

                    <View style={[styles.marginTop_20]}>

                        {
                            comments && (comments).length > 0?
                                <FlatList
                                    data={comments}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        id={item.id}
                                        name={item.user.name}
                                        image={item.user.avatar}
                                        comment={item.comment}
                                        rate={item.rate}
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
            <Footer navigation={navigation} activeTab={'comments'} delegate={true}/>
        </Container>
    );
}

export default Comments;


