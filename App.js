import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import CamLens from './components/CamLens';
import Indicators from './components/Indicators';
import ColorPalette from './context/ColorPalette';
import PokeContentPanel from './components/PokeContentPanel';

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    gameFont: require('./assets/kongtext.ttf'),
    snes: require('./assets/snes.ttf'),
  });

  if (!fontsLoaded || fontError) return <></>;
  return (
    <SafeAreaView style={styles.container}>
      <CamLens />
      <Indicators />
      <PokeContentPanel />
      <Text style={styles.title}>Pokedex</Text>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: ColorPalette.rose,
    padding: 8,
  },
  title: {
    fontSize: 54,
    fontFamily: 'snes',
    color: ColorPalette.carbon,
    textAlign: 'center',
    marginTop: 24,
  },
});
