import { useEffect, useRef, useState } from 'react';
import PokeSearchBar from './PokeSearchBar';
import PokeNickNameForm from './PokeNickNameForm';
import PokeList from './PokeList';
import PokeDetail from './PokeDetail';
import PokeService from '../services/PokeService';
import useStateStore from '../context/useStateStore';
import { useShallow } from 'zustand/react/shallow';
import Search from '../lib/Search';
import ViewPort from './ViewPort';

const PokeContentPanel = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(useStateStore.getState().catalogue);

  const { name, setLensState } = useStateStore(
    useShallow((state) => ({
      setLensState: state.setLensState,
      name: state.nameForDetail,
    })),
  );

  const flatListRef = useRef();
  const nickNameFormRef = useRef();

  useEffect(function fetchPokemon() {
    const main = async () => {
      setLensState('loading');
      if (!useStateStore.getState().catalogue.length) {
        await PokeService.getOriginals();
      }
      Search.refreshDefinitions();
      setData(useStateStore.getState().catalogue);
      setLensState('idle');
    };
    main();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (text) => {
    if (!text.length) {
      setData(useStateStore.getState().catalogue);
    } else setData(Search.name(text).map((i) => i.item));
    setSearch(text);
    if (flatListRef.current) flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <>
      {name ? (
        <PokeNickNameForm nickNameFormRef={nickNameFormRef} />
      ) : (
        <PokeSearchBar search={search} handleSearch={handleSearch} />
      )}
      <ViewPort>
        {name ? (
          <PokeDetail name={name} nickNameFormRef={nickNameFormRef} />
        ) : (
          <PokeList data={data} flatListRef={flatListRef} />
        )}
      </ViewPort>
    </>
  );
};
export default PokeContentPanel;
