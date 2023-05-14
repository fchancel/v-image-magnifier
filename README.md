[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![build](https://img.shields.io/npm/v/v-image-magnifier)](https://www.npmjs.com/package/v-image-magnifier)

<div align="center">
<img src="https://github.com/fchancel/v-image-magnifier/blob/main/examples/logo.png?raw=true"/>
</div>

# v-image-magnifier
A Vue 3 plugin that provides interactive image zoom functionality. Allow users to zoom in on an image by hovering over it, providing an enlarged view of the corresponding part of the image.
 

## Installation

To install v-image-magnifier, run the following command:

```
npm install --save v-image-magnifier
```

## Options

| Option  | Type   | Default   | Description  | Required |
| ------- | -------- | -------- | -------- | -------- |
| altImage   | string    |     | Value for the alt attribute of the image.    |  |
| backgroundColor   | string    |   "#ffff"  | Image background color (Visible when zooming in on an image border).    |  |
| boxShadow   | string    |  "0 5px 10px -2px rgba(0, 0, 0, 0.5)"   | Magnifying glass shadow style.    |  |
| cursorNone   | boolean    |   true  | Hides the cursor in the middle of the magnifying glass.    |  |
| deactivate   | boolean    |  false   | Disables the magnifying glass system (Allows the image to be displayed normally).    |  |
| fitContent   | boolean    |  true   | Allows you to specify whether the size of the box containing the image should automatically adapt to the size of the image. When this option is enabled (true), the box will have a width and height equal to the size of the image. When disabled (false), the box will have a width of 100% and a height of 100% of its container, and the image will be resized to fit this size.    |  |
| imgClass   | string    |     | A CSS class that will be placed on the image.    |  |
| magnifiedBorderRadius   | number    |  50   | The radius of the magnifying glass.    |  |
| magnifiedBorderSize   | number    |   4  | The border size of the magnifying glass.    |  |
| magnifiedBorderColor   | string    |   "#ffff"  | The amount of blur to apply to the element.    |  |
| magnifiedBorderStyle   | string    |   "solid"  | The border style of the magnifying glass (Solid, dotted, double...)    |  |
| magnifiedTransition   | string    |  "opacity 0.2s"   | Transition effect to be applied when the magnifying glass enters the image.    |  |
| src   | string    |     | source of the image to display.    | ✓ |
| zIndex   | number    |   99  | z-index of the magnifying glass.    |  |
| zoomSize   | number    |  100   | Size of the magnifying glass.    |  |
| zoomFactor   | number    |   1.8  | Zoom factor (Allows you to manage the power of the zoom).    |  |

## Usage

### Global Usage

To use VImageMagnifier globally in your Vue.js application, you can install it using `app.use` in the entry point of your main application file.

```javascript
import { createApp } from "vue";
import VImageMagnifier from "v-image-magnifier";

const app = createApp(App);
app.use(VImageMagnifierPlugin, {
         // Change options here
         zoomSize: 150,
         zoomFactor: 2,
         // ...
    });
app.mount("#app");
```

By passing an options object to app.use, you can customize the behavior of VImageMagnifier. In the example above, the zoomFactor option is set to 2, which increases the zoom level, and the zoomSize option is set to 150 for a bigger magnifying glass.

These options will be applied globally to all instances of the VImageMagnifier component in your application.


#### Importing in a Specific Component

If you prefer to use VImageMagnifier only in a specific component, you can import it directly into that component.

```javascript
<template>
  <VImageMagnifier src="path/to/my/file.png" />
</template>

<script setup>
import { createApp } from "vue";
import VImageMagnifier from "v-image-magnifier";
</setup>
```

Make sure to import the VImageMagnifier component in the specific component where you want to use it.

### Example Usage

```javascript
<template>
  <VImageMagnifier 
      src="path/to/my/file.png"
      :zoomSize="200
      :zoomFactore="2"
      :magnifiedBorderRadius="5"
   />
</template>

<script setup>
import { createApp } from "vue";
import VImageMagnifier from "v-image-magnifier";
</setup>
```

## Example

![Demo GIF of Magnifier](https://github.com/fchancel/v-image-magnifier/blob/main/examples/magnifier-1.gif?raw=true)


![Demo GIF of Magnifier](https://github.com/fchancel/v-image-magnifier/blob/main/examples/magnifier-2.gif?raw=true)


![Demo GIF of Magnifier](https://github.com/fchancel/v-image-magnifier/blob/main/examples/magnifier-3.gif?raw=true)

## Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/fchancel/v-image-magnifier/issues) or create a pull request.

## License

V-Privacy is licensed under the MIT License. See the [LICENSE](https://github.com/fchancel/v-image-magnifier/blob/main/LICENSE) file for more information.
