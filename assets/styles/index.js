import {Dimensions , I18nManager , Platform} from "react-native";
import COLORS from '../../src/consts/colors'

const width     = Dimensions.get('window').width;
const height    = Dimensions.get('window').height;
const isIOS      = Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';
const IS_IPHONE_12 	= (height === 780 || width === 780 || height === 812 || width === 812 ||
    height === 844 || width === 844 || height === 896 || width === 896 ||
    height === 926 || width === 926) && Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS;

const styles = ({

    // Style Loading

    loading : {
        position                : 'absolute',
        top                     : 0,
        right                   : 0,
        width                   : '100%',
        height                  : '100%',
        zIndex                  :  99999,
        backgroundColor         : "rgba(0,0,0,0.5)",
    },

    container:{
      flex:1
    },
    imageBackground: {
        width: null,
        height: null,
        flex: 1,
    },
    // Style Color ConText

    text_babyblue : {
        color               : COLORS.babyblue
    },
    text_gray : {
        color               : COLORS.gray
    },
    text_green : {
        color               : COLORS.green
    },
    text_midGray : {
        color               : COLORS.midGray
    },
    text_black : {
        color               : COLORS.black
    },
    text_orange : {
        color               : COLORS.orange
    },
    text_light_gray : {
        color               : COLORS.lightGray
    },
    text_red : {
        color               : COLORS.red
    },
    text_White : {
        color               : '#FFF'
    },
    text_mstarda : {
        color               : COLORS.mstarda
    },

    // Style Font

    textRegular : {
        fontFamily          : 'flatRegular',
    },
    textBold : {
        fontFamily          : 'flatMedium'
    },
    textDecoration : {
        textDecorationLine  : "underline"
    },
    linethrough : {
        textDecorationLine  : "line-through"
    },
    fontBold : {
        fontWeight          : "bold"
    },
    fontSpacing: {
        letterSpacing       : 1,
    },
    textSize_10 : {
        fontSize            : 10,
    },
    textSize_11 : {
        fontSize            : 11,
    },
    textSize_12 : {
        fontSize            : 12,
    },
    textSize_13 : {
        fontSize            : 13,
    },
    textSize_14 : {
        fontSize            : 14,
    },
    textSize_15 : {
        fontSize            : 15,
    },
    textSize_16 : {
        fontSize            : 16,
    },
    textSize_17 : {
        fontSize            : 17,
    },
    textSize_18 : {
        fontSize            : 18,
    },
    textSize_20 : {
        fontSize            : 20,
    },
    textSize_22 : {
        fontSize            : 22,
    },
    textSize_24 : {
        fontSize            : 24,
    },
    textSize_26 : {
        fontSize            : 26,
    },
    textSize_28 : {
        fontSize            : 28,
    },
    textSize_30 : {
        fontSize            : 30,
    },
    textSize_32 : {
        fontSize            : 32,
    },

    // Style Direction Text

    textCenter : {
        textAlign           : "center"
    },
    textRight : {
        textAlign           : "left"
    },
    textLeft : {
        textAlign           : "left"
    },

    // Margin Space Vertical

    marginVertical_5 : {
        marginVertical      : 5
    },
    marginVertical_10 : {
        marginVertical      : 10
    },
    marginVertical_15 : {
        marginVertical      : 15
    },
    marginVertical_20 : {
        marginVertical      : 20
    },
    marginVertical_25 : {
        marginVertical      : 25
    },
    marginVertical_35 : {
        marginVertical      : 35
    },
    marginVertical_45 : {
        marginVertical      : 45
    },
    marginBottom_150 : {
        marginBottom      : 150
    },
    marginTop_120 : {
        marginTop      : 120
    },
    marginBottom_40 : {
        marginBottom      : 40
    },
    marginBottom_50 : {
        marginBottom      : 50
    },
    marginBottom_80 : {
        marginBottom      : 80
    },
    marginBottom_5 : {
        marginBottom      : 5
    },
    marginBottom_7 : {
        marginBottom      : 7
    },
    marginBottom_10 : {
        marginBottom      : 10
    },
    marginBottom_12 : {
        marginBottom      : 12
    },
    marginBottom_15 : {
        marginBottom      : 15
    },
    marginBottom_20 : {
        marginBottom      : 20
    },
    marginBottom_25 : {
        marginBottom      : 25
    },
    marginBottom_30 : {
        marginBottom      : 30
    },
    marginBottom_35 : {
        marginBottom      : 35
    },
    marginBottom_60: {
        marginBottom      : 60
    },
    marginBottom_65: {
        marginBottom      : 65
    },
    marginTop_5 : {
        marginTop      : 5
    },
    marginTop_7 : {
        marginTop      : 7
    },
    marginTop_10 : {
        marginTop      : 10
    },
    marginTop_15 : {
        marginTop      : 15
    },
    marginTop_25 : {
        marginTop      : 25
    },
    marginTop_30 : {
        marginTop      : 30
    },
    marginTop_35 : {
        marginTop      : 35
    },
    marginTop_40 : {
        marginTop      : 40
    },
    marginTop_55 : {
        marginTop      : 55
    },
    marginTop_60 : {
        marginTop      : 60
    },
    marginTop_65 : {
        marginTop      : 65
    },
    marginTop_20 : {
        marginTop      : 20
    },
    marginTop_125 : {
        marginTop      : 125
    },
    marginTop_150 : {
        marginTop      : 150
    },

    // Margin Space Horizontal

    marginHorizontal_0 : {
        marginHorizontal    : 0
    },
    marginHorizontal_5 : {
        marginHorizontal    : 5
    },
    marginHorizontal_7 : {
        marginHorizontal    : 7
    },
    marginHorizontal_10 : {
        marginHorizontal    : 10
    },
    marginHorizontal_15 : {
        marginHorizontal    : 15
    },
    marginHorizontal_20 : {
        marginHorizontal    : 20
    },
    marginHorizontal_25 : {
        marginHorizontal    : 25
    },
    marginHorizontal_35 : {
        marginHorizontal    : 35
    },

    // Padding Space Vertical

    paddingVertical_0 : {
        paddingVertical      : 0
    },
    paddingVertical_5 : {
        paddingVertical      : 5
    },
    paddingVertical_7 : {
        paddingVertical      : 7
    },
    paddingVertical_10 : {
        paddingVertical      : 10
    },
    paddingVertical_15 : {
        paddingVertical      : 15
    },
    paddingVertical_20 : {
        paddingVertical      : 20
    },
    paddingVertical_25 : {
        paddingVertical      : 25
    },
    paddingVertical_45 : {
        paddingVertical      : 45
    },
    paddingTop_50 : {
        paddingTop      : 50
    },
    paddingTop_30 : {
        paddingTop      : 30
    },
    paddingTop_20 : {
        paddingTop      : 20
    },
    paddingTop_10 : {
        paddingTop      : 10
    },

    // Padding Space Horizontal

    paddingHorizontal_0 : {
        paddingHorizontal    : 0
    },
    paddingHorizontal_5 : {
        paddingHorizontal    : 5
    },
    paddingHorizontal_7 : {
        paddingHorizontal    : 7
    },
    paddingHorizontal_10 : {
        paddingHorizontal    : 10
    },
    paddingHorizontal_15 : {
        paddingHorizontal    : 15
    },
    paddingHorizontal_20 : {
        paddingHorizontal    : 20
    },
    paddingHorizontal_25 : {
        paddingHorizontal    : 25
    },
    paddingHorizontal_30 : {
        paddingHorizontal    : 30
    },
    paddingHorizontal_35 : {
        paddingHorizontal    : 35
    },
    paddingHorizontal_45 : {
        paddingHorizontal    : 45
    },
    paddingHorizontal_70 : {
        paddingHorizontal    : 70
    },
    paddingBottom55 : {
        paddingBottom    : 55
    },
    paddingTop20 : {
        paddingTop    : 20
    },

    // Style Border Radius

    Radius_0 : {
        borderRadius        : 0
    },
    Radius_3 : {
        borderRadius        : 3
    },
    Radius_5 : {
        borderRadius        : 5
    },
    Radius_7 : {
        borderRadius        : 7
    },
    Radius_10 : {
        borderRadius        : 10
    },
    Radius_15 : {
        borderRadius        : 15
    },
    Radius_20 : {
        borderRadius        : 20
    },
    Radius_30 : {
        borderRadius        : 30
    },
    Radius_40 : {
        borderRadius        : 40
    },
    Radius_50 : {
        borderRadius        : 50
    },
    Radius_60 : {
        borderRadius        : 60
    },
    Radius_70 : {
        borderRadius        : 70
    },
    Radius_80 : {
        borderRadius        : 80
    },
    Radius_90 : {
        borderRadius        : 90
    },
    Radius_100 : {
        borderRadius        : 100
    },
    RadiusTop_5 : {
        borderTopLeftRadius   : 5,
        borderTopRightRadius  : 5
    },

    // Background Color

    bg_gray : {
        backgroundColor     : COLORS.gray
    },
    bg_black : {
        backgroundColor     : COLORS.black
    },
    bg_babyblue : {
        backgroundColor     : COLORS.babyblue
    },

    bg_mstarda : {
        backgroundColor     : COLORS.mstarda
    },
    bg_lightMstarda : {
        backgroundColor     : '#f9e0b4'
    },
    bg_overlay : {
        backgroundColor     : "rgba(250, 218, 208, 0.9)"
    },
    overlay_white : {
        backgroundColor     : "#ffffff36"
    },
    overlay_black : {
        backgroundColor     : "rgba(0, 0, 0, 0.5)"
    },
    bg_White : {
        backgroundColor     : '#FFF'
    },
    bg_light_gray : {
        backgroundColor     : '#F1F1F1'
    },


    // Style Search

    checkBox : {
        paddingLeft             : !I18nManager.isRTL && IS_IPHONE_X ? 7 : I18nManager.isRTL ? 0 : 2,
        paddingBottom           : 0,
        borderRadius            : 5,
        paddingRight            : I18nManager.isRTL && IS_IPHONE_X? 7 : I18nManager.isRTL ? 2 : 0,
        marginRight             : 20,
    },

    // Style Shadow

    boxShadow : {
        shadowColor             : "#363636",
        shadowOffset            : { width: 0, height: 1},
        shadowOpacity           : 0.22,
        shadowRadius            : 2.22,
        elevation               : 3,
    },

    // Styles Flex Box
    keyboardAvoid: {
        width:'100%',
        height: null,
        flex: 1,
    },
    writingDir : {
        writingDirection : I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    flexCenter : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
    },
    centerContext : {
        alignItems          : 'center',
        justifyContent      : 'center',
    },
    SelfCenter : {
        alignSelf           : 'center',
    },
    SelfRight : {
        alignSelf           : 'flex-end',
        justifyContent      : 'center',
    },
    SelfLeft : {
        alignSelf           : 'flex-start',
        justifyContent      : 'center',
    },
    justifyCenter : {
        justifyContent      : 'center',
    },
    justifyTop : {
        justifyContent      : 'flex-end',
    },
    justifyStart : {
        justifyContent      : 'flex-start',
    },
    alignCenter : {
        alignItems      : 'center',
    },
    alignStart : {
        alignSelf      : 'flex-start',
    },
    alignEnd : {
        alignSelf      : 'flex-end',
    },
    rowGroup : {
        flexDirection       : "row",
        justifyContent      : "space-between",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowCenter : {
        flexDirection       : "row",
        alignSelf           : 'center',
        justifyContent      : "center",
        alignItems          : "center",
    },
    rowRight : {
        flexDirection       : "row",
        alignSelf           : 'flex-start',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    rowLeft : {
        flexDirection       : "row",
        alignSelf           : 'flex-end',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    bgFullWidth : {
        flexGrow            : 1,
    },
    flex_10 : {
        flexBasis           : '10%'
    },
    flex_20 : {
        flexBasis           : '20%'
    },
    flex_25 : {
        flexBasis           : '25%'
    },
    flex_30 : {
        flexBasis           : '30%'
    },
    flex_40 : {
        flexBasis           : '40%'
    },
    flex_45 : {
        flexBasis           : '45%'
    },
    flex_50 : {
        flexBasis           : '50%'
    },
    flex_55 : {
        flexBasis           : '55%'
    },
    flex_60 : {
        flexBasis           : '60%'
    },
    flex_70 : {
        flexBasis           : '70%'
    },
    flex_80 : {
        flexBasis           : '80%'
    },
    flex_90 : {
        flexBasis           : '90%'
    },
    flex_100 : {
        flexBasis           : '100%'
    },


    //  Style For App

    windowWidth : {
        paddingVertical     : 30,
        width               : '100%',
        height              : '100%',
    },
    bgContent : {
        width               : null,
        height              : null,
        flex                : 1,
    },
    Width_48 : {
        width               : '48%'
    },
    Width_50 : {
        width               : '50%'
    },
    Width_60 : {
        width               : '60%'
    },
    Width_70 : {
        width               : '70%'
    },
    Width_75 : {
        width               : '75%'
    },
    Width_80 : {
        width               : '80%'
    },
    Width_85 : {
        width               : '85%'
    },
    Width_87 : {
        width               : '87%'
    },
    Width_90 : {
        width               : '90%'
    },
    Width_95 : {
        width               : '95%'
    },
    Width_97 : {
        width               : '97%'
    },
    Width_100 : {
        width               : '100%'
    },
    width_20 : {
        width               : 20
    },
    width_30 : {
        width               : 30
    },
    width_40 : {
        width               : 40
    },
    width_50 : {
        width               : 50
    },
    width_60 : {
        width               : 60
    },
    width_70 : {
        width               : 70
    },
    width_80 : {
        width               : 80
    },
    width_90 : {
        width               : 90
    },
    width_100 : {
        width               : 100
    },
    width_120 : {
        width               : 120
    },
    width_130 : {
        width               : 130
    },
    width_150 : {
        width               : 150
    },
    width_180 : {
        width               : 180
    },
    height_10 : {
        height               : 10
    },
    height_15 : {
        height               : 15
    },
    height_20 : {
        height               : 20
    },
    height_30 : {
        height               : 30
    },
    height_35 : {
        height               : 35
    },
    height_40 : {
        height               : 40
    },
    height_45 : {
        height               : 45
    },
    height_50 : {
        height               : 50
    },
    height_60 : {
        height               : 60
    },
    height_70 : {
        height               : 70
    },
    height_80 : {
        height               : 80
    },
    height_90 : {
        height               : 90
    },
    height_100 : {
        height              : 100
    },
    height_120 : {
        height              : 120
    },
    height_130 : {
        height              : 130
    },
    height_150 : {
        height              : 150
    },
    height_160 : {
        height              : 160
    },
    height_200 : {
        height              : 200
    },
    height_230 : {
        height              : 230
    },
    height_250 : {
        height              : 250
    },
    height_300 : {
        height              : 300
    },
    height_320 : {
        height              : 320
    },
    height_340 : {
        height              : 340
    },
    height_400 : {
        height              : 400
    },
    heightFull : {
        height              : '100%'
    },
    minHeight : {
        minHeight           :  150
    },
    overHidden : {
        overflow            : 'hidden'
    },

    // Style Img Logo

    icon130 : {
        width               : 130,
        height              : 130,
    },
    icon150 : {
        width               : 150,
        height              : 150,
    },
    icon200 : {
        width               : 200,
        height              : 200,
    },
    icon220 : {
        width               : 220,
        height              : 220,
    },
    icon50 : {
        width               : 50,
        height              : 50,
    },
    icon20 : {
        width               : 20,
        height              : 20,
    },
    icon23 : {
        width               : 23,
        height              : 23,
    },
    icon10 : {
        width               : 10,
        height              : 10,
    },
    icon12 : {
        width               : 12,
        height              : 12,
    },
    icon15 : {
        width               : 15,
        height              : 15,
    },
    icon17 : {
        width               : 17,
        height              : 17,
    },
    icon30 : {
        width               : 30,
        height              : 30,
    },
    icon33 : {
        width               : 33,
        height              : 33,
    },
    icon60 : {
        width               : 60,
        height              : 60,
    },
    icon70 : {
        width               : 70,
        height              : 70,
    },
    icon100 : {
        width               : 100,
        height              : 100,
    },
    icon80 : {
        width               : 80,
        height              : 80,
    },
    icon250 : {
        width               : 250,
        height              : 250,
    },
    icon110 : {
        width               : 110,
        height              : 110,
    },
    icon160 : {
        width               : 160,
        height              : 160,
    },
    icon170 : {
        width               : 170,
        height              : 170,
    },
    icon25 : {
        width               : 25,
        height              : 25,
    },
    icon35 : {
        width               : 35,
        height              : 35,
    },
    icon40 : {
        width               : 40,
        height              : 40
    },
    icon45 : {
        width               : 45,
        height              : 45
    },

    //  Style Header

    headerView : {
        backgroundColor         : COLORS.blue,
        zIndex                  : 99,
        paddingTop              : 20,
        paddingRight            : 0,
        paddingLeft             : 0,
        overflow                : 'hidden',
        elevation               : 0,
        borderBottomWidth       : 0,
        alignItems              : 'center',
        height                  : 100,
        borderBottomLeftRadius  : 30,
        borderBottomRightRadius : 30,
    },
    whatsappContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bodyText : {
        position            : 'relative',
        alignItems          : 'center',
        flex                : 1,
        top                 : -1
    },
    leftIcon : {
        flex                : 0,
        transform           : I18nManager.isRTL ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }],
        marginHorizontal    : 15
    },
    rightIcon : {
        flex                : 0
    },
    iconHeader : {
        width               : 50,
        height              : 40
    },
    rotatTouch : {
        transform           : [{ rotate: '50deg' }],
    },
    rotatIcon : {
        transform           : [{ rotate: '-50deg' }],
    },

    // Style position

    position_R : {
        position                : 'relative',
        zIndex                  : 999
    },
    position_A : {
        position                : 'absolute',
        zIndex                  : 9999
    },
    fixItem : {
        top                     : -20,
        right                   : -20
    },
    top_0 : {
        top                     : 0
    },
    top_5 : {
        top                     : 5
    },
    top_10 : {
        top                     : 10
    },
    top_15 : {
        top                     : 15
    },
    top_20 : {
        top                     : 20
    },
    top_25 : {
        top                     : 25
    },
    top_30 : {
        top                     : 30
    },
    top_35 : {
        top                     : 35
    },
    bottom_0 : {
        bottom                  : 0
    },
    bottom_10 : {
        bottom                  : 10
    },
    bottom_20 : {
        bottom                  : 20
    },
    bottom_30 : {
        bottom                  : 30
    },
    bottom_40 : {
        bottom                  : 40
    },
    right_0 : {
        right                     : 0
    },
    right_5 : {
        right                     : 5
    },
    right_10 : {
        right                     : 10
    },
    right_15 : {
        right                     : 15
    },
    right_20 : {
        right                     : 20
    },
    right_25 : {
        right                     : 25
    },
    right_30 : {
        right                     : 30
    },
    right_35 : {
        right                     : 35
    },
    left_0 : {
        left                     : 0
    },
    left_5 : {
        left                     : 5
    },
    left_10 : {
        left                     : 10
    },
    left_15 : {
        left                     : 15
    },
    left_20 : {
        left                     : 20
    },
    left_25 : {
        left                     : 25
    },
    left_30 : {
        left                     : 30
    },
    left_35 : {
        left                     : 35
    },



    directionColumnSpace:{
        flexDirection:'column',
        justifyContent:'space-between' ,
        alignItems:'center' ,
    },
    directionColumnSpace2:{
        flexDirection:'column',
        justifyContent:'center' ,
        alignItems:'space-between' ,
    },
    directionColumn:{
        flexDirection:'column',
        alignItems:'center' ,
    },
    directionRowReverse:{
        flexDirection:'row-reverse',
    },
    directionColumnC:{
        justifyContent:'center' ,
        flexDirection:'column'
    },
    directionColumnCenter:{
        justifyContent:'center' ,
        alignItems:'center' ,
        flexDirection:'column'
    },
    directionRowCenter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    directionRow:{
        flexDirection:'row',
        alignItems:'center'
    },
    directionBasicRow:{
        flexDirection:'row',
    },
    directionRowEnd:{
        flexDirection:'row',
        alignItems:'flex-end'
    },
    directionRowSpace:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    transform:{
        transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]
    },
    transformReverse:{
        transform: I18nManager.isRTL ? [{rotateY : '-180deg'}] : [{rotateY : '0deg'}]
    },
    productCard:{
        marginLeft:10 ,
        flexDirection:'column' ,
        flex:1,
        paddingVertical:5
    },
    eventdoteStyle:{
        backgroundColor:'#ddd',
        borderRadius: 50,
        width: 8,
        height: 8,
        bottom:-45
    },
    eventactiveDot:{
        borderRadius: 50,
        borderColor: COLORS.mstarda,
        backgroundColor: COLORS.mstarda,
        width: 8,
        height: 8,
        bottom:-45
    },
    eventswiper:{
        width: '100%',
        height: 150,
    },
    swiperImg:{
        height:'100%' ,
        width:'100%' ,
        borderRadius:10,
    },
    imgOverLay:{
        backgroundColor     : "rgba(0, 0, 0, 0.5)",
        position:'absolute',
        height:'100%' ,
        width:'100%' ,
        zIndex:1,
    },
    swiperborder:{
        position:'absolute',
        height:'88%' ,
        width:'90%' ,
        zIndex:1,
        borderWidth: 2,
        borderColor: '#c7c7c7',
        alignSelf:'center',
        top:'7%'
    },
    doteStyle:{
        backgroundColor: COLORS.gray,
        borderRadius: 5,
        left: 0,
        right:0,
        bottom: 40,
        width: 15,
        height: 15,
    },
    activeDot:{
        borderRadius: 5,
        borderColor: COLORS.orange,
        backgroundColor: COLORS.orange,
        width: 15,
        height: 15,
        left: 0,
        right:0,
        bottom: 40
    },
    doteStyle2:{
        backgroundColor: COLORS.gray,
        borderRadius: 5,
        left: -125,
        bottom: '60%',
        width: 15,
        height: 4,
    },
    activeDot2:{
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.blue,
        backgroundColor: COLORS.blue,
        width: 25,
        height: 4,
        left: -125,
        bottom: '60%',
    },
    mstrdaBtn:{
        width:'100%',
        height:40,
        backgroundColor:COLORS.mstarda,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25
    },
    payMethod:{
        paddingHorizontal:20,
        height:45,
        backgroundColor:COLORS.blue,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    grayBtn:{
        width:'100%',
        height:45,
        backgroundColor:"#BBBBBB",
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        borderRadius:10,
    },
    item : {
        borderBottomWidth: 0,
        marginTop: 0,
        width:'100%',
        paddingLeft:0,
        marginLeft:0,
        marginBottom:25,
        flexDirection:'column'
    },
    label : {
        alignSelf: 'flex-start',
        fontFamily: 'flatRegular',
        fontSize: 14,
        color:COLORS.gray
    },
    labelText : {
        left: 15,
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
        fontSize: 15,
        zIndex:10,
        position:'absolute' ,
    },
    input : {
        color               : COLORS.gray,
        paddingRight        : 15,
        paddingLeft         : 15,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'flatRegular',
        fontSize            : 14,
        height              : 45,
        width               :'100%',
        backgroundColor     :'#eee',
        marginTop           : 15,
        borderRadius        :20,
        borderTopRightRadius :I18nManager.isRTL ? isIOS ? 20 : 0 : 20,
        borderTopLeftRadius :I18nManager.isRTL ? isIOS ? 0 : 20 : 0
    },
    viewInput : {
        paddingRight        : 15,
        paddingLeft         : 15,
        borderColor         : COLORS.midGray,
        borderWidth         : .5,
        borderLeftWidth    : 7,
        height              : 45
    },
    inputPicker : {
        color               : '#fff',
        paddingRight        : 17,
        paddingLeft         : isIOS ? 10 : 0,
        borderColor         : COLORS.babyblue,
        borderWidth         : .5,
        borderLeftWidth     : 7,
        height              : 45
    },
    inputSearch : {
        color               : '#fff',
        paddingRight        : 80,
        paddingLeft         : 20,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'flatRegular',
        fontSize            : 14,
        borderRadius        :30,
        height              :45,
        marginRight         :15,
        backgroundColor     :'#2e2e2e'
    },
    searchInput : {
        borderRadius        : 10,
        color               : COLORS.black,
        backgroundColor     : '#ddd',
        paddingRight        : 15,
        paddingLeft         : 15,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'flatRegular',
        fontSize            : 14,
        height              : 40
    },
    filter : {
        borderRadius        : 10,
        backgroundColor     : '#F1F1F1',
        width               : 50,
        height              : 50,
        justifyContent      :'center',
        alignItems          :'center',
        marginLeft          :10
    },
    searchIcon : {
        position            :'absolute',
        zIndex              :1,
        left                :20
    },
    closeIcon : {
        position            :'absolute',
        zIndex              :1,
        right                :20
    },
    chooseLang : {
        borderColor         : COLORS.babyblue,
        borderWidth         : .5,
        borderLeftWidth     : 7,
        width               : '100%',
        height              : 45
    },
    langFloat : {
        position            :'absolute',
        top                 : -10,
        left                : 20,
        backgroundColor     : '#ffffff',
        // alignSelf           : 'flex-start',
        fontFamily          : 'flatRegular',
        fontSize            : 15,
    },
    textArea : {
        borderColor         : COLORS.gray,
        borderWidth         : 1,
        borderRadius        : 10,
        width               : "100%",
        color               : COLORS.blue,
        paddingRight        : 20,
        paddingLeft         : 20,
        textAlign           : 'right',
        fontFamily          : 'flatRegular',
        fontSize            : 15,
        top                 : 0,
        marginTop           : 25
    },
    Active : {
        borderWidth           : 1,
        borderColor           : COLORS.mstarda,
        zIndex:-1
    },
    noActive : {
        borderWidth           : 1,
        borderColor           : COLORS.gray,
    },
    borderGray : {
        borderWidth           : 1,
        borderColor           : '#ddd',
    },
    borderbabyblue : {
        borderWidth           : 1,
        borderColor           : COLORS.babyblue,
    },
    borderMstarda : {
        borderWidth           : 1,
        borderColor           : COLORS.mstarda,
    },
    borderGreen : {
        borderWidth           : 1,
        borderColor           : COLORS.green,
    },
    borderBottomGray : {
        borderBottomWidth           : 1,
        borderColor           : '#ddd',
    },
    scrollView: {
        flexDirection       : 'row',
        alignSelf           : 'flex-start',
    },
    carousalText: {
        position       : 'absolute',
        left           : 0,
        flexDirection           : 'column',
        justifyContent           : 'center',
        zIndex          :10,
        paddingHorizontal:5,
        paddingVertical:10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        marginTop:20
    },
    carousalRatedText: {
        flexDirection           : 'column',
        justifyContent           : 'center',
        paddingHorizontal:5,
        paddingVertical:7,
        width:'100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    scrollCat : {
        marginRight:10,
        width: 80,
        height: 115,
        justifyContent:'flex-end',
        paddingBottom:5
    },
    scrollImg : {
        width               : '100%',
        height              : '100%',
        marginBottom        :10,
        borderRadius        :10,
        position            :'absolute'
    },
    activeTabs : {
        backgroundColor     : COLORS.yellow,
        paddingVertical:7,
        paddingHorizontal:7,
        borderRadius:5
    },
    noActiveTabs : {
        backgroundColor     : 'transparent',
        paddingVertical:7,
        paddingHorizontal:7,
        borderRadius:5
    },
    touchFav: {
        backgroundColor:COLORS.babyblue,
        width:30,
        height:50,
        borderRadius:13,
        position:'absolute',
        top:-20,
        right:5,
        alignItems:'center',
        justifyContent:"flex-end",
        paddingBottom:10
    },
    touchBlue: {
        backgroundColor:'#1cd6c98c',
        width:30,
        height:35,
        borderBottomLeftRadius:13,
        borderBottomRightRadius:13,
        alignItems:'center',
        justifyContent:"flex-end",
        paddingBottom:10
    },
    discountMark: {
        position:'absolute',
        left:20,
        top:0
    },
    scrollContent: {
        flexDirection:'column',
        justifyContent:'space-between' ,
        position : 'absolute',
        zIndex:1,
        height:'100%'
    },
    starStyle:{
        marginHorizontal    : 1,
    },
    footerStyle:{
        backgroundColor:'#fff',
        height: 80,
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    activeTab : {
        paddingVertical:10 ,
        paddingHorizontal      : 7,
        backgroundColor:COLORS.mstarda,
        borderRadius:20
    },
    unActiveTab : {
        paddingVertical:10 ,
        paddingHorizontal      : 7,
        backgroundColor:'transparent',
        borderRadius:20
    },
    notiCard:{
        borderRadius: 20,
        // height: 100,
        overflow:'hidden',
        borderWidth:1,
        borderTopColor:COLORS.lightGray,
        borderRightColor:COLORS.lightGray,
        borderBottomColor:COLORS.lightGray,
        borderLeftWidth: 4,
        flexDirection: 'row',
    },
    popCard:{
        borderRadius: 20,
        overflow:'hidden',
        borderWidth:1,
        borderTopColor:'#fff',
        borderRightColor:'#fff',
        borderBottomColor:'#fff',
        borderLeftWidth: 4,
        flexDirection: 'row',
    },
    chatCard:{
        borderRadius: 20,
        padding:10,
        overflow:'hidden',
    },
    cardDate:{
        borderRightWidth: 1,
        borderRightColor: '#ddd' ,
        justifyContent:'center'
    },
    bgModel : {
        width                   : "95%",
        flex                    : 1,
        alignSelf               : 'center',
    },
    modalBorder : {
        width:'40%',
        height:5,
        backgroundColor:COLORS.black,
        alignSelf:'center',
        borderRadius:5,
        marginBottom:20
    },
    topNav : {
        height:100,
        backgroundColor:'#fff',
        alignSelf:'center',
        borderBottomLeftRadius: 50,
        overflow:'hidden'
    },
    bottomLayCurve : {
        backgroundColor     : "#888ca08c",
        borderTopLeftRadius  : 30,
        borderTopRightRadius : 30,
        paddingVertical:30,
        paddingHorizontal:20,
        minHeight:200
    },
    whiteDot : {
        backgroundColor: "#fff",
        borderRadius:5,
        width:3,
        height:3,
        position:'absolute',
        left:0,
        top:0
    },
    slider:{
        height:35 ,
        borderColor:'#acabae',
        borderWidth:0
    },
    checkbox:{
        paddingRight:2,
    },
    line:{
        borderWidth:.5,
        borderColor:'#ddd',
        width:'100%',
        alignSelf:'center'
    },
    controlBar: {
        position: 'absolute',
        bottom: '40%',
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    talkBubbleTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderRightColor: 'transparent',
        borderTopColor: COLORS.gray,
        transform: [
            {rotate: I18nManager.isRTL ?'270deg':'-270deg'}
        ],
        // position:'absolute',
        bottom:0,
        left:-10
    },
    talkTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
        transform: [
            {rotate: '180deg'}
        ],
        position:'absolute',
        bottom:-10,
        right:103
    },
    langSelect :{
        backgroundColor:COLORS.lightGray ,
        width: 180,
        height: 170,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow :{
        shadowColor: '#f2f2f2',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 2,
        width:'103%',
        left:-4
    },
    wrapText: {
        flexDirection: 'column', top: 450, position: 'absolute', width: '100%' , paddingHorizontal:25 , justifyContent:'center' , alignItems:'center'
    },
    introButton: {
        position: 'absolute', bottom: 0, width, backgroundColor: COLORS.mstarda, height: 50, justifyContent:'center', alignItems:'center',
    },
    mainScroll: {
        borderBottomWidth: 2,
        borderBottomColor: '#dcdada94',
        height: 50,
    },
    scrollTouch: {
        // width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginHorizontal: 1,
        paddingHorizontal: 5,
        paddingVertical: 20,

    },
    scrollText: {
        fontSize: 12,
        fontFamily: 'flatRegular',
        height: 50,
        lineHeight: 50
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 7,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        position: 'absolute',
        bottom: 0
    },
    followStep:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:25
    },
    stepLine:{
        height:30,
        backgroundColor:COLORS.mstarda,
        width:1.5,
        position:'absolute',
        left:9,
        top:20
    },skyCircle:{
        backgroundColor:COLORS.mstarda,
        borderColor:COLORS.mstarda,
        borderWidth:1,
        width:20,
        height:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        marginRight:10
    },
    checkCircle:{
        fontSize:15,
        color:'#fff',
    },

    //    Shams Style ....................
    mapInputContainer:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        position: 'absolute',
        zIndex: 1,
        top: IS_IPHONE_X ? 97 : 115,
        height:50
    },
    mapInput: {
        color               : COLORS.gray,
        // paddingRight        : 15,
        // paddingLeft         : 15,
        textAlign           : I18nManager.isRTL ? 'right' : 'left',
        fontFamily          : 'flatRegular',
        fontSize            : 14,
        height              : 45,
        width               :'100%',
    }
});

export default styles;