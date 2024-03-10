import { Pressable, StyleSheet, Text } from 'react-native';
import ColorPalette from '../context/ColorPalette';
import useStateStore from '../context/useStateStore';
import { useShallow } from 'zustand/react/shallow';

const PokeListItem = ({ item }) => {
  const { setName, setLensState } = useStateStore(
    useShallow((state) => ({
      setName: state.setNameForDetail,
      setLensState: state.setLensState,
    })),
  );

  const handlePress = () => {
    setName(item.name);
    setLensState('backOption');
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );
};
export default PokeListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 4,
    backgroundColor: ColorPalette.screenGreen,
    justifyContent: 'center',
    borderColor: ColorPalette.screenWhite,
    borderWidth: 4,
    borderStyle: 'solid',
  },
  name: {
    fontFamily: 'gameFont',
    color: ColorPalette.carbon,
    alignSelf: 'center',
  },
});
