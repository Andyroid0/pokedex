import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import useStateStore from '../context/useStateStore';
import { useShallow } from 'zustand/react/shallow';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPalette from '../context/ColorPalette';

const CamLens = () => {
  const { lensState, setLensState, setName } = useStateStore(
    useShallow((state) => ({
      lensState: state.lensState,
      setLensState: state.setLensState,
      setName: state.setNameForDetail,
    })),
  );

  const handlePress = () => {
    setName(undefined);
    setLensState('idle');
  };

  return (
    <View style={styles.outline}>
      <View style={styles.lens}>
        {lensState === 'loading' && (
          <ActivityIndicator
            animating={lensState === 'loading'}
            color="white"
            size="large"
            style={styles.indicator}
          />
        )}
        {lensState === 'backOption' && (
          <Pressable style={styles.button} onPress={handlePress}>
            <MaterialIcons name="arrow-back" size={36} color={ColorPalette.lensWhite} />
            <Text style={styles.label}>Back</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lens: {
    borderRadius: 100,
    backgroundColor: ColorPalette.lensBlue,
    height: 72,
    width: 72,
    position: 'absolute',
    left: 16,
    top: 16,
    justifyContent: 'center',
  },
  outline: {
    borderRadius: 100,
    backgroundColor: ColorPalette.lensWhite,
    height: 104,
    width: 104,
    position: 'absolute',
    left: 32,
    top: 64,
  },
  indicator: {
    alignSelf: 'center',
  },
  label: {
    color: 'white',
    fontFamily: 'snes',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
});
export default CamLens;
