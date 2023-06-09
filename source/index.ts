import type { createApp } from "vue";
import VImageMagnifier from "./VImageMagnifier.vue";

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


export default {
  install: (app: ReturnType<typeof createApp>, options?: Options) => {
    app.component("VImageMagnifier", VImageMagnifier);

    for (let key in options) {
      if (VImageMagnifier.props.hasOwnProperty(key)) {
        VImageMagnifier.props[key].default = options[key];
      }
    }
  },
};
