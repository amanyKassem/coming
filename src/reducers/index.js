import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import about from './AboutReducer';
import policy from './PolicyReducer';
import wallet from './WalletReducer';
import appInfo from './AppInfoReducer';
import questions from './QuestionsReducer';
import notifications from './NotificationsReducer';
import intro from './IntroReducer';
import banners from './BannersReducer';
import categories from './CategoriesReducer';
import providerProducts from './ProviderProductsReducer';
import product from './ProductReducer';
import cart from './CartReducer';
import banks from './BanksReducer';
import offers from './OffersReducer';
import favourites from './FavouritesReducer';
import orders from './OrdersReducer';
import places from './PlacesReducer';
import comments from './CommentsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    about,
    policy,
    wallet,
    appInfo,
    questions,
    notifications,
    intro,
    banners,
    categories,
    providerProducts,
    product,
    cart,
    banks,
    offers,
    favourites,
    orders,
    places,
    comments,
});
