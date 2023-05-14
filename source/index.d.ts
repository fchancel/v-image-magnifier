// index.d.ts

import { App } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $myAddedProperty: string
  }
}

export interface Options {
  src: string;
  imgClass?: string;
  zoomSize?: number;
  zoomFactor?: number;
  backgroundColor?: string;
  cursorNone?: boolean;
  magnifiedBorderRadius?: number;
  magnifiedBorderSize?: number;
  magnifiedBorderColor?: string;
  magnifiedBorderStyle?: string;
  zIndex?: number;
  boxShadow?: string;
  magnifiedTransition?: string;
  altImage?: string;
  deactivate?: boolean;
  fitContent?: boolean;
}

export interface VImageMagnifier {
  props: Options;
}

declare const MyPlugin: {
  install: (app: App, options?: Options) => void;
}

export default MyPlugin;
