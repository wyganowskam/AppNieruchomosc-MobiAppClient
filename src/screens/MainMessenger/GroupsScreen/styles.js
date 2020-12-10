import { StyleSheet } from 'react-native';
import colors from "../../../config/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.lightWhite
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        top: 0,
        backgroundColor: colors.grey
      },
});

export default styles;