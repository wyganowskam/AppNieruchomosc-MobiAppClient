
import { StyleSheet,Dimensions, } from 'react-native';
import colors from '../../config/colors';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height:  50,
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.grey,
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
        width: SCREEN_WIDTH  - 20,
        height: 36,
        borderRadius: 24,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.grey,
        marginVertical: 8
    }
});
export default styles;