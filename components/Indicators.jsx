import { StyleSheet, View } from 'react-native';
import ColorPalette from '../context/ColorPalette';

const Indicators = () => {
  return (
    <View style={styles.container}>
      <View style={styles.outline}>
        <View style={styles.left} />
      </View>
      <View style={styles.outline}>
        <View style={styles.middle} />
      </View>
      <View style={styles.outline}>
        <View style={styles.right} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '16%',
    position: 'absolute',
    top: 72,
    left: '50%',
  },
  outline: {
    borderRadius: 100,
    backgroundColor: ColorPalette.lensWhite,
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    borderRadius: 100,
    backgroundColor: ColorPalette.indicatorRed,
    height: 12,
    width: 12,
    justifyContent: 'center',
  },
  middle: {
    borderRadius: 100,
    backgroundColor: ColorPalette.indicatorYellow,
    height: 12,
    width: 12,
    justifyContent: 'center',
  },
  right: {
    borderRadius: 100,
    backgroundColor: ColorPalette.indicatorGreen,
    height: 12,
    width: 12,
    justifyContent: 'center',
  },
});
export default Indicators;
