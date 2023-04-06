# React Legacy Class Converter

React Legacy Class Converter is a utility that helps you convert React createClass components to ES6 classes. It simplifies the process of updating your legacy React components to modern React code.

## Features

 - Converts `React.createClass` components to ES6 class components
 - Updates lifecycle methods, state, and prop types
 - Handles mixins and getDefaultProps

## Installation

 - Download the latest `.vsix` file from the [releases page](https://github.com/leonstafford/react-legacy-class-converter/releases).
 - In Visual Studio Code, go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
 - Click on the three dots in the top right corner of the Extensions view, and select "Install from VSIX..." from the dropdown menu.
 - Locate the downloaded `.vsix` file and click "Install".

## Usage

 - Open a file containing a legacy React component that uses `React.createClass`.
 - Right-click anywhere in the file and select "Convert React.createClass Component" from the context menu.
 - The legacy component will be automatically converted to an ES6 class component.

## Development

### Running Tests

To run the test suite, execute the following command:

`npm test`

### Building the Project

To build the project, run the following command:

`npm run dist`

This will generate the dist directory containing the compiled extension files.

### Packaging the Extension

To create a `.vsix` file for the extension, run the following command:

npm run package (may require `npm install -g vsce`)

This will generate a .vsix file in the project directory that can be installed in Visual Studio Code.

## Support

Create an issue here or email Leon Stafford at [me@ljs.dev](mailto:me@ljs.dev)

