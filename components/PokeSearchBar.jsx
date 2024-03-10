import { StyleSheet, TextInput } from 'react-native';
import ColorPalette from '../context/ColorPalette';

const PokeSearchBar = ({ search, handleSearch }) => {
  return (
    <TextInput
      placeholder="search"
      value={search}
      onChangeText={(text) => handleSearch(text)}
      style={styles.inputField}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};
const styles = StyleSheet.create({
  inputField: {
    backgroundColor: ColorPalette.screenGreen,
    height: 60,
    borderRadius: 4,
    borderColor: ColorPalette.screenWhite,
    borderWidth: 4,
    borderStyle: 'solid',
    padding: 10,
    marginHorizontal: 8,
    marginBottom: 16,
    marginTop: 'auto',
    fontFamily: 'gameFont',
    fontSize: 12,
  },
});
export default PokeSearchBar;
