import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';


const reactotron = Reactotron.configure({ name: 'coming', host : '192.168.1.7', port: 9090 })
    .use(reactotronRedux()).useReactNative()
    .connect();

export default reactotron

