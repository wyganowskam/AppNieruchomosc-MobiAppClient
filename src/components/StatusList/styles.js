import { StyleSheet } from 'react-native';
import colors from "../../config/colors";

const styles = StyleSheet.create({
    listTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 12
    },
    active: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.grey
    },
    watchAll: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.accentColor
    },
    headView: {
        alignItems: 'center',
        marginHorizontal: 4
    },
    headSub: {
        width: 48,
        height: 48,
        borderRadius: 24,
        margin: 4,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headText: {
        fontSize: 12,
        width: 64,
        textAlign: 'center'
    },
    absoluteView: {
        position: 'absolute',
        bottom: -4,
        right: -2,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
    },
    itemView: {
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 4
    },
    nameText: {
        fontSize: 12
    },
    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 4,
        backgroundColor: colors.onlineGreen
    }
});

export default styles;