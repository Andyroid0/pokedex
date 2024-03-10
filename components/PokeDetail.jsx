import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useStateStore from '../context/useStateStore';
import { useShallow } from 'zustand/react/shallow';
import PokeService from '../services/PokeService';
import ColorPalette from '../context/ColorPalette';

const PokeDetail = ({ nickNameFormRef }) => {
  const { catalogue, lensState, name, setLensState } = useStateStore(
    useShallow((state) => ({
      catalogue: state.catalogue,
      lensState: state.lensState,
      name: state.nameForDetail,
      setLensState: state.setLensState,
    })),
  );

  const [data, setData] = useState();

  useEffect(
    function fetchDetails() {
      const main = async () => {
        if (!name.length) return;
        setData(await PokeService.getDetail(name));
      };
      main();
    },
    [name, catalogue],
  );

  useEffect(function preventLockout() {
    if (lensState !== 'idle') return;
    setLensState('backOption');
  });
  if (!data) return;

  const getSpriteURI = () => {
    const art = data.details.sprites.other['official-artwork'];
    return art['front_default'];
  };
  const getHeight = () => {
    return data.details.height;
  };
  const getWeight = () => {
    return data.details.weight;
  };

  const handleNickNamePress = () => {
    nickNameFormRef.current.focus();
  };

  return (
    <View style={styles.container}>
      {!!data && (
        <>
          <View style={styles.head}>
            <Image source={{ uri: getSpriteURI() }} style={styles.img} contentFit="contain" />
            <Text style={styles.title} numberOfLines={1}>
              {name.toUpperCase()}
            </Text>
          </View>
          <View style={styles.content}>
            <Pressable style={styles.statLine} onPress={handleNickNamePress}>
              <Text style={styles.statLabel}>nick-name: </Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {data.nickName}
              </Text>
            </Pressable>
            <View style={styles.statLine}>
              <Text style={styles.statLabel}>height: </Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {getHeight()}
              </Text>
            </View>
            <View style={styles.statLine}>
              <Text style={styles.statLabel}>weight: </Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {getWeight()}
              </Text>
            </View>
            <View style={styles.statLine}>
              <Text style={styles.statLabel}>types: </Text>
            </View>
            {data.details.types.map((i) => (
              <Text style={styles.statValue} numberOfLines={1} key={i.slot}>
                {i.type.name}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.screenGreen,
    flex: 1,
  },
  img: {
    flex: 1,
    width: '100%',
    borderColor: `${ColorPalette.screenGray + 66}`,
    borderWidth: 2,
  },
  statLine: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginVertical: 6,
  },
  statLabel: {
    fontFamily: 'gameFont',
    fontSize: 14,
    color: ColorPalette.carbon,
  },
  statValue: {
    fontFamily: 'gameFont',
    fontSize: 12,
    color: ColorPalette.carbon,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  title: {
    fontFamily: 'gameFont',
    fontSize: 18,
    color: ColorPalette.carbon,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 16,
    textDecorationLine: 'underline',
    textDecorationColor: ColorPalette.screenGray,
  },
  head: {
    width: '100%',
    height: '50%',
    padding: 8,
  },
  content: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderColor: `${ColorPalette.screenGray + 66}`,
    borderWidth: 2,
  },
  typePanel: {
    overflow: 'scroll',
  },
});
export default PokeDetail;
