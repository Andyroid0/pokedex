import axios from 'axios';
import useStateStore from '../context/useStateStore';

export default class PokeService {
  static getOriginals = async () => {
    const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const catalogue = result.data.results;
    PokeService.addNickNameProps(catalogue);
    useStateStore.getState().setCatalogue(catalogue);
    return catalogue;
  };
  static getDetail = async (name) => {
    const record = useStateStore.getState().catalogue.find((i) => i.name === name);
    const result = (await axios.get(record.url)).data;
    return useStateStore.getState().patchInDetail(name, result);
  };
  static addNickNameProps = (catalogue) => {
    catalogue.forEach((i) => {
      if (!i.nickName) i.nickName = '';
    });
  };
}
