import { StyleSheet, View } from 'react-native';
import ColorPalette from '../context/ColorPalette';

const ViewPort = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    height: '60%',
    overflow: 'hidden',
    backgroundColor: ColorPalette.screenGray,
    padding: 6,
    borderRadius: 4,
    borderColor: ColorPalette.carbon,
    borderWidth: 4,
    borderStyle: 'solid',
  },
});
export default ViewPort;
