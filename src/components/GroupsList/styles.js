import { StyleSheet,Dimensions, } from 'react-native';
import colors from '../../config/colors';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    card: {
        width: SCREEN_WIDTH / 2.5,
        height: SCREEN_HEIGHT / 3.6,
        margin: 5
    },
    cardView: {
        width: SCREEN_WIDTH/ 2.5,
        height: SCREEN_HEIGHT / 3.6,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footer: {
        width: SCREEN_WIDTH/ 2.5 - 16,
        paddingVertical: 22,
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.separator
    },
    nameView: {
        alignItems: 'center',
        padding: 8,
        paddingTop: 16
    },
    nameText: {
        marginTop: 8,
        color: colors.black,
        fontSize: 15,
        textAlign: 'center'
    },
    last: {
        marginTop: 4,
        color: colors.grey,
        fontSize: 12,
        textAlign: 'center'
    },
    members: {
        color: colors.grey,
        fontSize: 12,
        textAlign: 'center'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;