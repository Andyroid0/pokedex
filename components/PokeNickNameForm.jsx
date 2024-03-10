import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ColorPalette from '../context/ColorPalette';
import useStateStore from '../context/useStateStore';
import { useShallow } from 'zustand/react/shallow';
import Search from '../lib/Search';

const PokeNickNameForm = ({ nickNameFormRef }) => {
  const [newNickName, setNewNickName] = useState();

  const { name, setNickName } = useStateStore(
    useShallow((state) => ({
      name: state.nameForDetail,
      setNickName: state.setNickName,
    })),
  );

  const handlePress = () => {
    setNickName(name, newNickName);
    setNewNickName(undefined);
    Search.refreshDefinitions();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Give a NickName?"
        value={newNickName}
        onChangeText={(text) => setNewNickName(text)}
        style={styles.inputField}
        autoCapitalize="none"
        autoCorrect={false}
        ref={nickNameFormRef}
      />
      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnLabel}>SAVE</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    height: 60,
    width: 60,
    borderRadius: 4,
    backgroundColor: ColorPalette.buttonViolet,
    justifyContent: 'center',
  },
  btnLabel: {
    fontFamily: 'snes',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 'auto',
  },
  inputField: {
    flex: 1,
    backgroundColor: ColorPalette.screenGreen,
    height: 60,
    borderRadius: 4,
    borderColor: ColorPalette.screenWhite,
    borderWidth: 4,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 16,
    marginRight: 16,
    fontFamily: 'gameFont',
    fontSize: 12,
  },
});
export default PokeNickNameForm;
