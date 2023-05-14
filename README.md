[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
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

### Plugin Installation 

In progress


## Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/fchancel/v-image-magnifier/issues) or create a pull request.

## License

V-Privacy is licensed under the MIT License. See the [LICENSE](https://github.com/fchancel/v-image-magnifier/blob/main/LICENSE) file for more information.
