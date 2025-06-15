import type { CSSProperties, ReactNode } from 'react';

export type GlobalLoaderProps = {
  loaderText?: string;
};

export type DeferredWrapperProps = {
  deferredDuration?: number;
  children: ReactNode;
};

export type SkeletonProps = {
  style?: CSSProperties;
  baseColor?: string;
  shimmerColor?: string;
};

export type LoaderStates = {
  isLoading: boolean;
  isActiveOverlay: boolean;
  loaderText: string;
  timer: NodeJS.Timeout | null;
};

type LoaderActions = {
  show: (options?: { loadingText?: string; isActiveOverlay?: boolean }) => void;
  debounceShow: (options?: {
    delay?: number;
    loadingText?: string;
    isActiveOverlay?: boolean;
  }) => void;
  hide: () => void;
};

export type LoaderStore = LoaderStates & {
  actions: LoaderActions;
};
