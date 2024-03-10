import Fuse from 'fuse.js';
import useStateStore from '../context/useStateStore';

let catalogue = useStateStore.getState().catalogue;
let fuse = new Fuse(catalogue, {
  keys: [
    { name: 'name', weight: 0.3 },
    { name: 'nickName', weighted: 1 },
  ],
});

export default class Search {
  static refreshDefinitions = () => {
    catalogue = useStateStore.getState().catalogue;
    fuse = new Fuse(catalogue, {
      keys: [
        { name: 'name', weight: 0.3 },
        { name: 'nickName', weighted: 1 },
      ],
    });
  };

  static name = (query) => {
    return fuse.search(query);
  };
}
