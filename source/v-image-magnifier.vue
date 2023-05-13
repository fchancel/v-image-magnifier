<template>
  <div 
    class="img-zoomer-box"
    :class="{ 'cursor-none': cursorNone && !deactivate,
              'fit-content': fitContent,
              'own-width': !fitContent
            }"
    ref="imgZoomerBox"
    @mousemove="zoomImage"
  >
    <img
      :src="src"
      class="original-img"
      :class="{imgClass}"
      :alt="altImage"
      ref="original"
      @load="setImageSize"
    />
    <div v-if="!deactivate" class="magnified-img" ref="magnified"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import type { Options } from "./interfaces";

//*********************************** */
//                PROPS               */
//*********************************** */

const props = withDefaults(defineProps<Options>(), {
  zoomSize: 100,
  zoomFactor: 1.8,
  deactivate: false,
  backgroundColor: "#ffff",
  cursorNone: true,
  magnifiedBorderRadius: 100,
  magnifiedBorderSize: 4,
  magnifiedBorderColor: "#ffff",
  magnifiedBorderStyle: "solid",
  zIndex: 99,
  boxShadow: "0 5px 10px -2px rgba(0, 0, 0, 0.5)",
  magnifiedTransition: "opacity 0.2s",
  fitContent: true
});

//*********************************** */
//                DATA                */
//*********************************** */

const imgZoomerBox = ref(); // Ref to images box HTML Element
const magnified = ref(); // Ref to magnified HTML Element 
const original = ref(); // Ref to original image HTML Element 

const originalWidth = ref(0);
const originalHeight = ref(0);

//*********************************** */
//                METHODS             */
//*********************************** */

onMounted(() => {
  setImageSize()
});

const setImageSize = () => {
  // Set width and height size with the size of original image
  originalWidth.value = original.value.naturalWidth;
  originalHeight.value = original.value.naturalHeight;
};

const zoomImage = (e: MouseEvent) => {
  if (!props.deactivate) {
    // Manage the magnified Image
    const style = magnified.value.style;
    const rect = imgZoomerBox.value.getBoundingClientRect();
    const scaleX = (original.value.naturalWidth / rect.width) * props.zoomFactor;
    const scaleY = (original.value.naturalHeight / rect.height) * props.zoomFactor;
    
    const x = (e.clientX - rect.left) * scaleX - halfZoomSize.value;
    const y = (e.clientY - rect.top) * scaleY - halfZoomSize.value;
    
    style.backgroundPositionX = -x + "px";
    style.backgroundPositionY = -y + "px";
    style.left = e.clientX - rect.left - halfZoomSize.value + "px";
    style.top = e.clientY - rect.top - halfZoomSize.value + "px";
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

const borderCss = computed(()=> `${props.magnifiedBorderSize}px ${props.magnifiedBorderStyle} ${props.magnifiedBorderColor}`);
const maxWidthCss = computed(()=> `${originalWidth}px}`);
</script>

<style scoped>
.cursor-none {
  cursor: none;
}

.fit-content{
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
  border-radius: v-bind(borderRadiusCss);
  border: v-bind(borderCss);
  z-index: v-bind(zIndex);
  box-shadow: v-bind(boxShadow);
  transition: v-bind(magnifiedTransition);
  pointer-events: none;
  position: absolute;
  max-width: v-bind(maxWidthCss);
  opacity: 0;
  display: block;
}
</style>
