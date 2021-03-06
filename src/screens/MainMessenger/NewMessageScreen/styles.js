
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
        marginBottom:40,
        borderColor: colors.white,
        paddingBottom:  0
    },
    chip: {
    
        backgroundColor:"transparent",
        color:"transparent",
        
        margin:2
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
        margin: 15,
        height:150,
        backgroundColor:colors.white
    },
    group:{
        backgroundColor:colors.white,
        margin:15,
    }
});
export default styles;