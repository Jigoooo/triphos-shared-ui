import { create } from 'zustand';

import type { LoaderStates, LoaderStore } from './loader-type.ts';

const loaderInitialState: LoaderStates = {
  isLoading: false,
  isActiveOverlay: false,
  loaderText: '',
  timer: null,
};

export const useLoaderStore = create<LoaderStore>()((setState, getState) => {
  return {
    ...loaderInitialState,
    actions: {
      show: ({ loadingText = 'Loading...', isActiveOverlay = true } = {}) => {
        setState((state) => ({
          ...state,
          isLoading: true,
          isActiveOverlay,
          loaderText: loadingText,
        }));
      },
      debounceShow: ({ delay = 300, ...rest } = {}) => {
        const timer = setTimeout(() => {
          getState().actions.show(rest);
          setState((prevState) => {
            return {
              ...prevState,
              timer: null,
            };
          });
        }, delay);

        setState((prevState) => {
          return {
            ...prevState,
            timer,
          };
        });
      },
      hide: () => {
        const { timer } = getState();
        if (timer) {
          clearTimeout(timer);
          setState((prevState) => {
            return {
              ...prevState,
              timer: null,
            };
          });
        }

        setState((state) => ({
          ...state,
          isLoading: false,
          isActiveOverlay: false,
        }));
      },
    },
  };
});

export const loader = useLoaderStore.getState().actions;
