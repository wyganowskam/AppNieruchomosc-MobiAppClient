import { StyleSheet ,Dimensions} from 'react-native';
import colors from "../../../config/colors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightWhite,
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        top: 0,
        backgroundColor: colors.button
      },
      search: {
          width: SCREEN_WIDTH-100,
          margin:15,
         
      }
});

export default styles;