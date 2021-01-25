import { StyleSheet ,Dimensions} from 'react-native';
import colors from "../../../config/colors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.beige,
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        top: 0,
        backgroundColor: colors.delicateButton,
        marginTop:10
      },
      search: {
            flex:1,
         marginRight:70,
         height:50
      }
});

export default styles;