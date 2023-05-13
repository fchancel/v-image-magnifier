import { Plugin } from "vue";
import { Options } from "./interfaces";

export declare const VImagineMagnifier: Plugin;

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $VImagineMagnifier: (options?: Options) => void;
  }
}

export default VImagineMagnifier;
