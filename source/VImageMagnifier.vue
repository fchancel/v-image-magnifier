<template>
  <div
    class="img-zoomer-box"
    :class="{ 'cursor-none': cursorNone && !isDeactivate, 'fit-content': fitContent, 'own-width': !fitContent }"
    ref="imgZoomerBox"
    @mousemove="zoomImage"
  >
    <img :src="src" class="original-img" :class="{ imgClass }" :alt="altImage" ref="original" @load="imageIsLoaded" />
  <div v-if="!isDeactivate" class="magnified-img" ref="magnified"></div>
</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";

//*********************************** */
//                INTERFACES          */
//*********************************** */

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

//*********************************** */
//                PROPS & EMITS       */
//*********************************** */

const props = withDefaults(defineProps<Options>(), {
  zoomSize: 100,
  zoomFactor: 1.8,
  deactivate: false,
  backgroundColor: "#ffff",
  cursorNone: true,
  magnifiedBorderRadius: 50,
  magnifiedBorderSize: 4,
  magnifiedBorderColor: "#ffff",
  magnifiedBorderStyle: "solid",
  zIndex: 99,
  boxShadow: "0 5px 10px -2px rgba(0, 0, 0, 0.5)",
  magnifiedTransition: "opacity 0.2s",
  fitContent: true,
});

const emits = defineEmits<{
  (e: "loaded"): void;
}>();
//*********************************** */
//                WATCHER             */
//*********************************** */

watch(() => props.deactivate, () => {
  if (isLoaded) {
    isDeactivate.value = props.deactivate;
  }
})

//*********************************** */
//                DATA                */
//*********************************** */

const imgZoomerBox = ref(); // Ref to images box HTML Element
const magnified = ref(); // Ref to magnified HTML Element
const original = ref(); // Ref to original image HTML Element

const originalWidth = ref(0);
const originalHeight = ref(0);

const bgPosX = ref(0);
const bgPosY = ref(0);

const leftPos = ref(0);
const topPos = ref(0);

const isLoaded = ref(false);

const isDeactivate = ref(props.deactivate);

//*********************************** */
//                METHODS             */
//*********************************** */

onMounted(() => {
  setImageSize();
});

const imageIsLoaded = () => {  
  setImageSize();
  emits("loaded");
  isLoaded.value = true;
  
  if (!props.deactivate) {
    isDeactivate.value = false;
  }
};

const setImageSize = () => {
  // Set width and height size with the size of original image
  originalWidth.value = original.value.naturalWidth;
  originalHeight.value = original.value.naturalHeight;
};

const zoomImage = (e: MouseEvent) => {
  if (!isDeactivate.value) {
    // Manage the magnified Image
    const rect = imgZoomerBox.value.getBoundingClientRect();
    const scaleX = (original.value.naturalWidth / rect.width) * props.zoomFactor;
    const scaleY = (original.value.naturalHeight / rect.height) * props.zoomFactor;

    const x = (e.clientX - rect.left) * scaleX - halfZoomSize.value;
    const y = (e.clientY - rect.top) * scaleY - halfZoomSize.value;

    bgPosX.value = -x;
    bgPosY.value = -y;
    leftPos.value = e.clientX - rect.left - halfZoomSize.value;
    topPos.value = e.clientY - rect.top - halfZoomSize.value;
  }
};

//*********************************** */
//                COMPUTED            */
//*********************************** */

// Computed for CSS style
const halfZoomSize = computed(() => props.zoomSize / 2);

const zoomSizeCss = computed(() => `${props.zoomSize}px`);

const originalSizeCss = computed(
  () => `${originalWidth.value * props.zoomFactor}px ${originalHeight.value * props.zoomFactor}px`
);

const backgroundCss = computed(() => `url("${props.src}") no-repeat ${props.backgroundColor}`);

const borderRadiusCss = computed(() => `${props.magnifiedBorderRadius}%`);

const borderCss = computed(
  () => `${props.magnifiedBorderSize}px ${props.magnifiedBorderStyle} ${props.magnifiedBorderColor}`
);

const maxWidthCss = computed(() => `${originalWidth.value}px`);

const backgroundPositionXCss = computed(() => `${bgPosX.value}px`);

const backgroundPositionYCss = computed(() => `${bgPosY.value}px`);

const leftPositionCss = computed(() => `${leftPos.value}px`);

const topPositionCss = computed(() => `${topPos.value}px`);
</script>

<style scoped>
.cursor-none {
  cursor: none;
}

.fit-content {
  width: fit-content;
}

.own-width {
  width: 100%;
  height: 100%;
}
.img-zoomer-box {
  position: relative;
}

.original-img {
  width: 100%;
  height: 100%;
}

.img-zoomer-box:hover .magnified-img,
.img-zoomer-box:active .magnified-img {
  opacity: 1;
}

.magnified-img {
  width: v-bind(zoomSizeCss);
  height: v-bind(zoomSizeCss);
  background: v-bind(backgroundCss);
  background-size: v-bind(originalSizeCss);
  background-position-x: v-bind(backgroundPositionXCss);
  background-position-y: v-bind(backgroundPositionYCss);
  border-radius: v-bind(borderRadiusCss);
  border: v-bind(borderCss);
  z-index: v-bind(zIndex);
  box-shadow: v-bind(boxShadow);
  transition: v-bind(magnifiedTransition);
  left: v-bind(leftPositionCss);
  top: v-bind(topPositionCss);
  pointer-events: none;
  position: absolute;
  max-width: v-bind(maxWidthCss);
  opacity: 0;
  display: block;
}
</style>
