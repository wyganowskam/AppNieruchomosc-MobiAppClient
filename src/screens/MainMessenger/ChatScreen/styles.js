
import { StyleSheet,Dimensions, } from 'react-native';
import colors from '../../../config/colors';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height:   SCREEN_HEIGHT/8+2,
        width:SCREEN_WIDTH-20,
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: "center",
      
        borderColor: colors.white,
        paddingBottom:  0
    },
    customContainer: {
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.grey,
        paddingBottom: 0
    },
    btn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden'
    },
    input: {
        flex:1,
        height: SCREEN_HEIGHT/8,
        borderRadius: 10,
        borderColor: colors.white,
        margin: 8,
       
    },
    card:{
        //width:2* SCREEN_WIDTH / 4,
        alignSelf:"flex-start",
        margin: 5
    },
    mycard:{
       // width:2* SCREEN_WIDTH / 4,
        alignSelf:"flex-end",
        alignContent:"flex-end",
        margin: 5
    },
    mess:{
        height:5.5*SCREEN_HEIGHT/8 +30 ,
        margin:20
    }
});
export default styles;