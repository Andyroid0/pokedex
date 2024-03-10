import { FlatList } from 'react-native';
import useStateStore from '../context/useStateStore';
import { useShallow } from 'zustand/react/shallow';
import PokeListItem from './PokeListItem';

const PokeList = ({ data, flatListRef }) => {
  const { lensState } = useStateStore(
    useShallow((state) => ({
      lensState: state.lensState,
    })),
  );

  if (lensState === 'loading') return;
  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={({ item }) => <PokeListItem item={item} key={item} />}
      keyExtractor={(item) => item.name}
    />
  );
};
export default PokeList;
