import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStateStore = create(
  persist(
    (set, get) => ({
      catalogue: [],
      setCatalogue: (value) => set({ catalogue: value }),

      patchInDetail: (name, detail) => {
        const copy = [...get().catalogue];
        const index = copy.findIndex((i) => i.name === name);
        if (index === -1) throw new Error('Pokemon record not found in catalogue!');
        const newRecord = {
          ...copy[index],
          details: { ...detail },
        };
        copy[index] = newRecord;
        set({ catalogue: copy });
        return newRecord;
      },

      setNickName: (name, nickName) => {
        const copy = [...get().catalogue];
        const index = copy.findIndex((i) => i.name === name);
        if (index === -1) throw new Error('Pokemon record not found in catalogue!');
        const newRecord = {
          ...copy[index],
          nickName,
        };
        copy[index] = newRecord;
        set({ catalogue: copy });
      },

      nameForDetail: undefined,
      setNameForDetail: (nameForDetail) => set({ nameForDetail }),

      lensState: 'idle',
      setLensState: (value) => set({ lensState: value }),
    }),
    {
      name: 'pokedex-state-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
export default useStateStore;
