import type { createApp } from "vue";
import VImagineMagnifier from "./v-image-magnifier.vue";
import type { Options } from "./interfaces";

export default {
  install: (app: ReturnType<typeof createApp>, options?: Options) => {
    app.component("VImagineMagnifier", VImagineMagnifier);

    for (let key in options) {
      if (VImagineMagnifier.props.hasOwnProperty(key)) {
        VImagineMagnifier.props[key].default = options[key];
      }
    }
  },
};
